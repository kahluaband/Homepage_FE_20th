import { useState } from 'react';

export default function SelectBox() {
    const [selectedValue, setSelectedValue] = useState('19시 00분');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); 

    const options = [
        { value: '', label: '입장 시간을 선택하세요.' },
        { value: '19시 00분', label: '19시 00분' },
        //{ value: '19시 30분', label: '19시 30분' },
        //{ value: '20시 00분', label: '20시 00분' },
    ];

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleOptionClick = (value:any) => {
        if (value !== '') {
            setSelectedValue(value);
            setIsDropdownVisible(false);
        }
    };

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    return (
        <div className="relative inline-block text-center transition-all duration-450" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
                type="button"
                className="appearance-none outline-none text-[10px] sm:text-[14px] font-[700] leading-[17px] cursor-pointer w-[45vw] h-[29px] md:w-[270px] md:h-[48px] rounded-[10px] border-solid bg-[white] text-[#000000] border-[2px] border-[#B9B9B9]"
                onClick={toggleDropdown}
            >
                {selectedValue}
            </button>
            <ul className={`${isDropdownVisible ? 'block' : 'hidden'} absolute top-[32px] sm:top-[58px] left-0 right-0 bg-[white] border-solid border-[2px] border-[#B9B9B9] rounded-[10px] overflow-hidden`}>
                {options.map((option) => (
                    <li key={option.value}>
                        <button
                            type="button"
                            className=" w-full text-center py-[7px] text-[8px] sm:text-[14px] focus:outline-none"
                            onClick={() => handleOptionClick(option.value)}
                            disabled={option.value === ''}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
