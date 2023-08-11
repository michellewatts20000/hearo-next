
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Provider from "../components/Provider";
import "../styles/globals.css";

export const metadata = {
  title: 'Hearo',
  description: 'Find quiet places to socialise',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="hero">
            <Navigation />
            <main className="app">
              {children}
            </main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  )
}
