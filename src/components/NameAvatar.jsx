import React, {useState} from 'react';


const NameAvatar = ({ name, src }) => {
    const imageUrl=`https://favicon.im/${src}?larger=true`
    const [imageError, setImageError] = useState(false);
    if (imageError){
        // 获取名字的首字母
        const firstLetter = name.charAt(0).toUpperCase();

        // 计算背景颜色：基于名字生成一个颜色
        const hashCode = (str) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = (hash << 5) - hash + str.charCodeAt(i);
            }
            return hash;
        };

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
        console.log(1234);
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
