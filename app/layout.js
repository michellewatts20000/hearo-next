
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

export const metadata = {
  title: 'Hearo',
  description: 'Find quiet places to socialise',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
