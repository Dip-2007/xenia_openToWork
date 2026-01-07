import '../styles/index.css';
import '../App.css';
import { Providers } from '../components/Providers';

export const metadata = {
    title: 'Xenia',
    description: 'Welcome to the Xeno-Dimension',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
