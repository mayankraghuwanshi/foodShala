import React from 'react'
import classnames from "classnames";

const InputTextField = ({
                            type = "text",
                            name,
                            value,
                            label,
                            error,
                            info,
                            onChange,
                            disable,
                            placeholder,
                        })=>{
    return (
        <div className="form-group">
            <input type={type} className={classnames("form-control form-control-lg" , {
                "is-invalid" : error
            })}
                   value={value}  onChange={onChange}  placeholder={placeholder} name={name}/>
            {info && <small className='form-text text-mute'>{info}</small>}
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>)
}

export default InputTextField