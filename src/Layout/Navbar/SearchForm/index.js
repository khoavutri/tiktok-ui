import '../Navbar.scss';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../../hooks';
import { Link } from 'react-router-dom';
import { BsThreeDots, BsSearch, BsCheckCircleFill } from 'react-icons/bs';
import { resultFormLogin } from '../../../utils/CallApiOverView';
function SearchForm() {
    const [Value, setValue] = useState('');
    const [close, setClose] = useState(true);
    const [showResultSearch, setShowResultSearch] = useState('an');
    const [data, setData] = useState([]);
    const inputRef = useRef();
    const debounce = useDebounce(Value, 500);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowResultSearch('an');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setClose(false);
            const x = await resultFormLogin(debounce)
                .then((da) => {
                    setClose(true);
                    return da;
                })
                .catch(() => {
                    setData([]);
                    setClose(true);
                    return [];
                });
            setData(x);
        };

        fetchData();
    }, [debounce]);

    const Close = () => {
        return (
            <>
                {close && (
                    <button className="input_img-icon">
                        <img
                            src="https://icons.iconarchive.com/icons/iconsmind/outline/16/Close-icon.png"
                            width="16"
                            height="16"
                            onClick={() => {
                                setValue('');
                                setShowResultSearch('');
                                inputRef.current.focus();
                            }}
                        />
                    </button>
                )}
                {!close && (
                    <img
                        src="https://icons.iconarchive.com/icons/amitjakhu/drip/16/loading-icon.png"
                        width="16"
                        height="16"
                        style={{ opacity: '0.6' }}
                        className="input_img-icon1"
                    />
                )}
            </>
        );
    };
    return (
        <div className="Navbar_formSearch">
            <div
                className="Navbar_form"
                onClick={() => {
                    setShowResultSearch('');
                }}
            >
                <input
                    ref={inputRef}
                    className="input_form"
                    placeholder="Enter your Search"
                    value={Value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ autocomplete: 'off' }}
                />
                {Value !== '' && <Close />}
                <button className="button_icon">
                    <img
                        src="https://icons.iconarchive.com/icons/designcontest/outline/24/Magnifier-icon.png"
                        width="24"
                        height="24"
                    />
                </button>
            </div>

            <div className={'Navbar_formResult ' + showResultSearch}>
                {Value && (
                    <Link style={{ marginTop: '10px', marginBottom: data.length > 0 ? '0' : '10px' }}>
                        <div className={'Navbar_formResultButton1'} style={{ height: '30px' }}>
                            <BsSearch width="24" height="24" className="Navbar_formResultButton1Img" />
                            <div>{Value}</div>
                            <BsThreeDots className="Navbar_formResultButton1Dot" />
                        </div>
                    </Link>
                )}

                {data.length > 0 && (
                    <>
                        <p style={{ marginLeft: '20px', color: 'gray' }}>Tài khoản: </p>
                        {data.map((number, index) => (
                            <div key={index} onClick={() => alert('khoa')}>
                                <div className={'Navbar_formResultButton1'}>
                                    <img
                                        src={
                                            number.avatar
                                                ? number.avatar
                                                : 'https://icons.iconarchive.com/icons/icons8/ios7/32/Users-Administrator-icon.png'
                                        }
                                        width="36"
                                        height="36"
                                        className="Navbar_formResultButton1Img"
                                    />
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <span style={{ marginRight: '5px' }}>{number.name}</span>

                                        {number.famous && (
                                            <BsCheckCircleFill color="#20D5EC" margintop="10px" fontSize="14px" />
                                        )}
                                    </div>
                                    <BsThreeDots className="Navbar_formResultButton1Dot" />
                                </div>
                            </div>
                        ))}

                        <div style={{ marginBottom: '10px' }}></div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchForm;
