import React  from 'react'


export default ()=>{
    console.log("woh")
    return(
        <footer style={{
            backgroundColor: "teal",
            fontSize: "15px"
        }} className="text-white mt-5 p-4 text-center">
            Copyright &copy; { new Date().getFullYear() } Mayank Raghuvanshi
        </footer>
    )
}