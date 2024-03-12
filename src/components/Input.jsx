import React from 'react'

const Input = (props) => {
    const { id, name, title, placeholder, type, value, onchange, onblur, errors, istouched } = props
    return (
        <div>
            <div className="input-container bg-[transperant] py-2 border-b-[1px] border-[#99dd999d] max-sm:hover:border-[#99dd999d] rounded-sm cursor-pointer">
                <div className="input flex flex-col px-2">
                    <label htmlFor="email" className='text-[#99dd999d] text-sm font-[g-medium] uppercase'>{title}</label>
                    <input
                        type={type}
                        placeholder={placeholder}
                        id={id}
                        name={name}
                        className='py-1 bg-[black] text-[#ffffff96] font-[g-light] placeholder:opacity-50 border-none outline-none'
                        autoComplete='off'
                        value={value}
                        onChange={onchange}
                        onBlur={onblur}
                    />
                    {errors && istouched ? <p className='text-sm text-[#ff000073] font-[g-light]'>{errors}</p> : null}
                </div> 
            </div>
        </div>
    )
}
export default Input