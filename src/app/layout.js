import "./globals.css";
import { PostProvider } from "../context/PostContext"; // import provider

export const metadata = {
  title: "Vibe Hive",
  description: "Front-end social feed app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PostProvider>
          {children} {/* now all pages have access to posts context */}
        </PostProvider>
      </body>
    </html>
  );
}