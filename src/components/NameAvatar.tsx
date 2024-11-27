import {useState} from 'react';

interface NameAvatarProps {
    name: string
    src: string
}

// 计算背景颜色：基于名字生成一个颜色
const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return hash;
}

const NameAvatar = ({name, src}: NameAvatarProps) => {
    const [imageError, setImageError] = useState<boolean>(false)
    const imageUrl = `https://favicon.im/${src}?larger=true`

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

    const handleError = () => {
        setImageError(true);
    };

    return (
        <img
            src={imageUrl}
            alt="icon"
            onError={handleError}
        />
    );
};
export default NameAvatar;
