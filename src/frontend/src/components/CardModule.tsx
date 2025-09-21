import React from 'react'

type CardModuleProps = {
    children: React.ReactNode;
}

const CardModule: React.FC<CardModuleProps> = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-4">
            {children}
        </div>
    )
}

export default CardModule
