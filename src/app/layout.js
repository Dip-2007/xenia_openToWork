import '../styles/index.css';
import '../App.css';

export const metadata = {
    title: 'Xenia',
    description: 'Welcome to the Xeno-Dimension',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
