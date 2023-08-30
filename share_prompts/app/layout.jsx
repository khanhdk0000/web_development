import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

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
                    <Nav />
                    {children}
                </main>
            </div>
        </body>
    </html>
  )
}

export default RootLayout