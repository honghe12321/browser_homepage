import React, {useEffect, useState} from 'react';


const NameAvatar = ({ name, size = 50,href }) => {
    const [imageError, setImageError] = useState(false);
    // 构建URL
    const imageUrl = `https://favicon.im/${href}?larger=true`;
    useEffect(() => {


        // 检查URL是否有效
        const checkImageUrl = async () => {
            try {
                const response = await fetch(imageUrl, {method: 'HEAD'}); // 使用 HEAD 请求获取响应头
                if (response.ok) {
                    setImageError(false); // 如果返回状态码为200，表示链接有效
                } else {
                    setImageError(true); // 如果返回非200状态码，则认为图片链接无效
                }
            } catch (error) {
                setImageError(true); // 如果发生错误（例如网络问题），也认为图片链接无效
            }
        };
    })
    //如果图片返回失败 加载一个默认图片
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
                    borderRadius: '0.5rem',
                    width: size,
                    height: size,
                    fontSize: size / 2,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                {firstLetter}
            </div>
        );
    }
    return (
        <img src={imageUrl} alt=''/>
    )


};

export default NameAvatar;
