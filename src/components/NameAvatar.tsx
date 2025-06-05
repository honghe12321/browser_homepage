import { useState, useEffect } from 'react';

interface NameAvatarProps {
    name: string;
    src: string;
}

// 计算背景颜色：基于名字生成一个颜色
const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return hash;
};

// IndexedDB 管理
class ImageCacheDB {
    private dbName = 'FaviconCache';
    private storeName = 'images';
    private db: IDBDatabase | null = null;

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'url' });
                }
            };
        });
    }

    async get(url: string): Promise<string | null> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(url);

            request.onsuccess = () => {
                const result = request.result;
                resolve(result ? result.data : null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async set(url: string, data: string): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({ url, data, timestamp: Date.now() });

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

const imageDB = new ImageCacheDB();

const NameAvatar: React.FC<NameAvatarProps> = ({ name, src }) => {
    const [imageError, setImageError] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string>('');

    // 正则表达找到域名
    const regex = /https?:\/\/([^/]+)/;
    const match = src.match(regex);
    let domain: string = src;
    if (match && match[1]) {
        domain = match[1];
    } else {
        domain = src.split("\/")[0];
    }

    const imageUrl = `https://favicon.im/${domain}?larger=true`;

    useEffect(() => {
        const loadImage = async () => {
            try {
                // 先从 IndexedDB 获取
                const cached = await imageDB.get(imageUrl);
                if (cached) {
                    setImageSrc(cached);
                    return;
                }

                // 如果没有缓存，获取并存储
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const reader = new FileReader();

                reader.onloadend = async () => {
                    const base64 = reader.result as string;
                    setImageSrc(base64);
                    await imageDB.set(imageUrl, base64);
                };

                reader.readAsDataURL(blob);
            } catch (error) {
                // 失败时使用原始 URL
                setImageSrc(imageUrl);
            }
        };

        loadImage();
    }, [imageUrl]);

    if (imageError) {
        // 获取名字的首字母
        const firstLetter = name.charAt(0).toUpperCase();
        const bgColor = `hsl(${hashCode(name) % 360}, 70%, 80%)`;

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: bgColor,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                {firstLetter}
            </div>
        );
    }

    const handleError = (): void => {
        setImageError(true);
    };

    return (
        <img
            src={imageSrc}
            alt="icon"
            onError={handleError}
        />
    );
};

export default NameAvatar;