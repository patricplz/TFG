export default function AppLogo() {
    return (
      <div className="flex items-center"> 
        <div>
          <img
            src="/storage/images/logo.png"
            style={{ width: '60px', height: 'auto', objectFit: 'cover' }}
            alt="ConectaPro Logo"
          />
        </div>
        <div className="ml-0 text-left text-sm md:block hidden">
          <span
            className="truncate leading-none font-semibold"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'white',
              textDecoration: 'none', 
            }}
          >
            ConectaPro
          </span>
        </div>
      </div>
    );
  }