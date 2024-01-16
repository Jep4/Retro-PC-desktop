import React from 'react';


import "./MainWindow.css"
function FileWindow() {

    const tempFile = ["React Portfolio", "File2", "File3", "File4", "File5",  "File6"];

    return (
        <div className='folderWrapper'>
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
    );
}

export default FileWindow;