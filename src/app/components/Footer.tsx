import { FaLinkedin, FaGithub, FaEnvelope, FaRegSun, FaRegMoon, FaHome, FaProjectDiagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#15171b] text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a href="https://github.com/raghav3615/chotuURL" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/70 hover:text-white transition-colors">
              <FaGithub className="text-lg" />
            </a>
            <a href="https://www.linkedin.com/in/raghavhere/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/70 hover:text-white transition-colors">
              <FaLinkedin className="text-lg" />
            </a>
            <a href="https://twitter.com/raghav_dadhich" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="text-white/70 hover:text-white transition-colors">
              <FaXTwitter className="text-lg" />
            </a>
            <a href="mailto:dadhichraghav896@gmail.com" aria-label="Email" className="text-white/70 hover:text-white transition-colors">
              <FaEnvelope className="text-lg" />
            </a>
          </div>          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Raghav Dadhich. All rights reserved.
          </p>
        </div>
      </footer>
  )
}
