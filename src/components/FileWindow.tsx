import React from 'react';


import "./MainWindow.css"
interface FilewindowProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}


const FileWindow: React.FC<FilewindowProps>=({token, setToken}) =>{

    const tempFile = ["email", "gitHub", "resume", "blog", "File5", "File6"];

    return (
        <div className='folder-wrapper'>
            <div>
                <h3>Contact Me</h3>
                <p>Name: Jooeun Park</p>
                <p>Email: jooeunp@sfu.ca</p>
                <p>gitHub: https://github.com/Jep4</p>
            </div>
            <div className='file-wrapper'>
                {tempFile.map((file, index) => (
                    <div className='one-file' key={index}>
                        <div className='folder' >
                            🗒️
                        </div>
                        <span>
                            {file}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileWindow;