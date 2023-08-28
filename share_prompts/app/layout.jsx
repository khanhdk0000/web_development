import React, { Children } from 'react'
import '@styles/global.css';

export const metadata = {
    title: "Prompt machine",
    description: "Discover AI"
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient'>
                </div>
                <main className='app'>
                    {children}
                </main>
            </div>
        </body>
    </html>
  )
}

export default RootLayout