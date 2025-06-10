import { useState } from 'react';

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

const NameAvatar: React.FC<NameAvatarProps> = ({ name, src }) => {
    const [imageError, setImageError] = useState<boolean>(false);

    // 正则表达找到域名
    const regex = /https?:\/\/([^/]+)/;
    const match = src.match(regex);
    let domain: string;
    if (match && match[1]) {
        domain = match[1];
    } else {
        domain = src.split("\/")[0];
    }

    const imageSrc = `https://favicon.im/${domain}?larger=true`;



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