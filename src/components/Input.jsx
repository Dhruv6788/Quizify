import React from 'react'

const Input = (props) => {
    const { id, name, title, placeholder, type, value, onchange, onblur, errors, istouched } = props
    return (
        <div>
            <div className="input-container bg-[transperant] py-2 border-b-[1px] border-purple-400 max-sm:hover:border-purple-400 rounded-sm cursor-pointer">
                <div className="input flex flex-col px-2">
                    <label htmlFor="email" className='text-purple-400 text-sm font-[g-medium] uppercase'>{title}</label>
                    <input
                        type={type}
                        placeholder={placeholder}
                        id={id}
                        name={name}
                        className='py-1 text-[black] text-xl tracking-wide font-[g-regular] placeholder:opacity-50 border-none outline-none'
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