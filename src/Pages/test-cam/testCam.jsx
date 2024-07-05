import { useState } from 'react';
import Camera from '../../component/app/camera/camera';
import styles from './style.module.scss';

const TestCam = () => {
    const [img, setImg] = useState('');

    const cameraHandle = (data) => {
        setImg(data);
    };
    return (
        <div className={styles.testCam}>
            <Camera
                width={500}
                height={400}
                cameraClick={cameraHandle}
                videoStop={(localRecordedChunks) => {
                    const blob = new Blob(localRecordedChunks, { type: 'video/webm' });
                    const fileName = 'recorded-video.webm';
                    const tempUrl = URL.createObjectURL(blob);
                    const anchorElement = document.createElement('a');
                    anchorElement.href = tempUrl;
                    anchorElement.download = fileName;
                    anchorElement.click();
                    URL.revokeObjectURL(tempUrl);
                }}
            />
            {img ? <img src={img} /> : ''}
        </div>
    );
};

export default TestCam;
