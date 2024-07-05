import { Button, Space } from 'antd';
import { FaCamera, FaRegStopCircle, FaSync, FaVideo } from 'react-icons/fa';
import styles from './style.module.scss';
import DetectRTC from 'detectrtc';
import { useEffect, useRef, useState } from 'react';

const Camera = ({ width, height, cameraClick, videoStop }) => {
    const [isWebRTCSupported, setIsWebRTCSupported] = useState(false);
    const [webRTCInfo, setWebRTCInfo] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const drawScene = (context, video) => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
    };
    const redrawScene = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) {
            console.error('Video or Canvas element not available');
            return;
        }
        const context = canvas.getContext('2d');
        drawScene(context, video);
    };
    const handleCapture = () => {
        const video = videoRef.current;
        if (!video) {
            console.error('Video element not available');
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64Data = canvas.toDataURL('image/jpeg');
        cameraClick(base64Data);
    };
    const startRecording = () => {
        setIsRecording(true);
        const stream = videoRef.current.srcObject;
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
        let localRecordedChunks = [];

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                localRecordedChunks.push(event.data);
            }
        };

        recorder.onstop = () => {
            if (videoStop) {
                videoStop(localRecordedChunks);
            }
        };

        recorder.start();
        setMediaRecorder(recorder);
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };
    useEffect(() => {
        DetectRTC.load(() => {
            setIsWebRTCSupported(DetectRTC.isWebRTCSupported);
            setWebRTCInfo({
                hasMicrophone: DetectRTC.hasMicrophone,
                hasSpeakers: DetectRTC.hasSpeakers,
                hasWebcam: DetectRTC.hasWebcam,
                osName: DetectRTC.osName,
                osVersion: DetectRTC.osVersion,
                browserName: DetectRTC.browser.name,
                browserVersion: DetectRTC.browser.version,
                isMobileDevice: DetectRTC.isMobileDevice,
            });

            if (DetectRTC.isWebRTCSupported && DetectRTC.hasWebcam) {
                navigator.mediaDevices
                    .getUserMedia({
                        video: {
                            width: { ideal: width || 800 },
                            height: { ideal: height || 450 },
                        },
                        audio: true,
                    })
                    .then((stream) => {
                        videoRef.current.srcObject = stream;
                    })
                    .catch((error) => {
                        console.error('Error accessing webcam:', error);
                    });
            }
        });
    }, []);
    console.log(videoRef);
    return (
        <div className={styles.camera}>
            {isWebRTCSupported && webRTCInfo?.hasWebcam ? (
                <>
                    <video ref={videoRef} autoPlay playsInline className={styles.videoDisplay} />
                    <canvas
                        ref={canvasRef}
                        width={width || 800}
                        height={height || 450}
                        className={styles.canvas}
                    ></canvas>
                    <Space className={styles.mainIcon}>
                        {cameraClick && (
                            <Button icon={<FaCamera />} onClick={cameraClick ? handleCapture : undefined} />
                        )}
                        {videoStop && (
                            <Button
                                icon={isRecording ? <FaRegStopCircle /> : <FaVideo />}
                                onClick={isRecording ? stopRecording : startRecording}
                            />
                        )}
                        <Button icon={<FaSync />} onClick={redrawScene} />
                    </Space>
                </>
            ) : (
                <>{JSON.stringify(isWebRTCSupported) + '-' + JSON.stringify(webRTCInfo?.hasWebcam)}</>
            )}
        </div>
    );
};

export default Camera;
