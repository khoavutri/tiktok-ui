import { Skeleton } from 'antd';

import { useSelector } from 'react-redux';

const LoadingPage = () => {
    const show = useSelector((s) => s.loadingBar.showPage);
    return (
        <>
            {show && (
                <Skeleton
                    active={true}
                    style={{
                        width: '40%',
                        position: 'absolute',
                        top: '20%',
                        left: '35%',
                    }}
                />
            )}
        </>
    );
};

export default LoadingPage;
