import request from './request';

const sellectUserById = async (id) => {
    const user = await request.get('public/SellectUserById', {
        id: id,
    });
    return user.data;
};
const autoLogin = async ({ username, password }) => {
    const user = await request.post('public/AutoLogin', {
        username: username,
        password: password,
    });
    return user.data;
};
const authenticationCode = async ({ gmail }) => {
    const code = await request.post('public/AuthenticatioCode', {
        gmail: gmail,
    });
    return code.data;
};
const searchUserByGmail = async ({ gmail }) => {
    const code = await request.post('public/SearchUserByGmail', {
        gmail: gmail,
    });
    return code.data;
};
const updatePassWord = async ({ gmail, password }) => {
    const code = await request.put('public/UpdatePassWordByGmail', {
        gmail: gmail,
        password: password,
    });
    return code;
};
const resultFormLogin = async (name) => {
    const data = await request.get('public/ResultFormLogin', {
        params: {
            name: name,
        },
    });
    return data.data;
};
const selectImgPostAll = async (size, userId) => {
    const data = await request.get('public/SelectImgPostAll', {
        params: {
            size: size,
            userId: userId,
        },
    });
    return data.data;
};

const uploadImgPost = async (link, mota, userId, bearToken) => {
    try {
        const response = await request.post(
            'user/UploadImgPost',
            JSON.stringify({
                mota: mota,
                link: link,
                userId: userId,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearToken}`,
                },
            },
        );

        return response;
    } catch (error) {
        throw error;
    }
};
const follow = async (nguoiFolowId, duocFolowId, bearToken) => {
    try {
        const response = await request.post(
            'user/Follow',
            JSON.stringify({
                nguoiFolowId: nguoiFolowId,
                duocFolowId: duocFolowId,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearToken}`,
                },
            },
        );

        return response;
    } catch (error) {
        throw error;
    }
};
const unFollow = async (nguoiFolowId, duocFolowId, bearToken) => {
    try {
        const response = await request.post(
            'user/UnFollow',
            JSON.stringify({
                nguoiFolowId: nguoiFolowId,
                duocFolowId: duocFolowId,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearToken}`,
                },
            },
        );

        return response;
    } catch (error) {
        throw error;
    }
};
const test = async (bearToken) => {
    console.log(`Bearer ${bearToken}`);
    try {
        const response = await request.get('user/test', {
            headers: {
                Authorization: `Bearer ${bearToken}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
const deleteVideoById = async (id, bearToken) => {
    const data = await request.delete('user/DeleteVideoById', {
        params: {
            VideoId: id,
        },
        headers: {
            Authorization: `Bearer ${bearToken}`,
        },
    });
    return data.data;
};
const likeVideoApi = async (userId, videoId, bearToken) => {
    const data = await request.post(
        'user/LikeVideo',
        JSON.stringify({
            userId: userId,
            videoId: videoId,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearToken}`,
            },
        },
    );
    return data;
};
const unLikeVideoApi = async (userId, videoId, bearToken) => {
    try {
        const response = await request.post(
            'user/UnLikeVideo',
            JSON.stringify({
                id: 0,
                userId: userId,
                videoId: videoId,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearToken}`,
                },
            },
        );

        return response;
    } catch (error) {
        throw error;
    }
};
const searchProfile = async (userId, userName) => {
    try {
        const response = await request.post('public/SearchProfile', null, {
            params: {
                userId: userId,
                userName: userName,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
const seachAllFollowing = async (userId, bearToken) => {
    const data = await request.get('user/SeachAllFollowing', {
        params: {
            userId: userId,
        },
        headers: {
            Authorization: `Bearer ${bearToken}`,
        },
    });
    return data.data;
};
const updateMyProfile = async (userId, avatar, userName, name, bio, bearToken) => {
    try {
        console.log(userId, avatar, userName, name, bio, bearToken);
        const response = await request.post('user/UpdateMyProfile', null, {
            params: {
                userId: userId,
                avatar: avatar,
                userName: userName,
                name: name,
                bio: bio,
            },
            headers: {
                Authorization: `Bearer ${bearToken}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
const selectImgPostAllFollowing = async (userId, bearToken) => {
    const data = await request.get('user/SelectImgPostAllFollowing', {
        params: {
            userId: userId,
        },
        headers: {
            Authorization: `Bearer ${bearToken}`,
        },
    });
    return data.data;
};
const selectRandomNotLogin = async (userId) => {
    const data = await request.get('public/SelectRandomNotLogin', {
        params: {
            userId: userId,
        },
    });
    return data.data;
};
const searchAllCmtsByVideoId = async (videoId, userId) => {
    const data = await request.get('public/SearchAllCmtsByVideoId', {
        params: {
            videoId: videoId,
            userId: userId,
        },
    });
    return data;
};
const searchBaiVietByVideoId = async (videoId, userId) => {
    const data = await request.get('public/SearchBaiVietByVideoId', {
        params: {
            videoId: videoId,
            userId: userId,
        },
    });
    return data;
};
const createCmt = async (userId, videoId, content, bearToken) => {
    try {
        const response = await request.post(
            'user/CreateCmt',
            JSON.stringify({
                id: 0,
                userId: userId,
                videoId: videoId,
                content: content,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearToken}`,
                },
            },
        );

        return response;
    } catch (error) {
        throw error;
    }
};
const deleteCmt = async (id, bearToken) => {
    const data = await request.delete('user/DeleteCmt', {
        params: {
            cmtId: id,
        },
        headers: {
            Authorization: `Bearer ${bearToken}`,
        },
    });
    return data;
};
const searchPostBynavBar = async (q, size, userId) => {
    const data = await request.get('public/Search-Post-By-navBar', {
        params: {
            size: size,
            userId: userId,
            q: q,
        },
    });

    return data.data;
};
const searchProfileByNavBar = async (q, size, userId) => {
    const data = await request.get('public/Search-profile-By-navBar', {
        params: {
            size: size,
            userId: userId,
            q: q,
        },
    });

    return data.data;
};
export {
    sellectUserById,
    autoLogin,
    authenticationCode,
    searchUserByGmail,
    updatePassWord,
    resultFormLogin,
    uploadImgPost,
    selectImgPostAll,
    follow,
    unFollow,
    deleteVideoById,
    likeVideoApi,
    unLikeVideoApi,
    searchProfile,
    seachAllFollowing,
    updateMyProfile,
    selectImgPostAllFollowing,
    selectRandomNotLogin,
    searchAllCmtsByVideoId,
    searchBaiVietByVideoId,
    createCmt,
    deleteCmt,
    searchPostBynavBar,
    searchProfileByNavBar,
    test,
};
