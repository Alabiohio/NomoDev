import { useEffect, useState } from "react";
import image from "./image.svg";
import vector2 from "./vector-2.svg";
import vector4 from "./vector-4.svg";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface NavItem {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  icon: JSX.Element;
  href: string;
}

export const Box = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 2,
    hours: 12,
    minutes: 23,
    seconds: 35,
  });

  const navItems: NavItem[] = [
    { label: "FEATURES", href: "#features" },
    { label: "TECHNOLOGY", href: "#technology" },
    { label: "WAITLIST", href: "#waitlist" },
    { label: "RESOURCES", href: "#resources" },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      icon: (
        <div className="relative w-4 h-4 aspect-[1]">
          <div className="relative h-full bg-[url(/vector.svg)] bg-[100%_100%]">
            <img
              className="absolute w-full h-full top-0 left-0"
              alt="Instagram icon"
              src={image}
            />
            <img
              className="absolute w-[78.12%] h-[78.13%] top-[10.94%] left-[10.94%]"
              alt=""
              src={vector2}
            />
          </div>
        </div>
      ),
      href: "#instagram",
    },
    {
      name: "Facebook",
      icon: (
        <div className="relative w-4 h-[15.9px] overflow-hidden aspect-[1] bg-[url(/vector-3.svg)] bg-[100%_100%]">
          <img
            className="absolute w-[42.77%] h-[80.47%] top-[19.53%] left-[29.49%]"
            alt="Facebook icon"
            src={vector4}
          />
        </div>
      ),
      href: "#facebook",
    },
    {
      name: "Twitter",
      icon: (
        <div className="relative w-[15.66px] h-4 aspect-[1] bg-[url(/vector-5.svg)] bg-[100%_100%]" />
      ),
      href: "#twitter",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
  };

  const formatTimeUnit = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  const countdownUnits = [
    { value: countdown.days, label: "DAYS" },
    { value: countdown.hours, label: "HOURS" },
    { value: countdown.minutes, label: "MINUTES" },
    { value: countdown.seconds, label: "SECONDS" },
  ];

  return (
    <div className="relative flex items-start min-w-[1440px]">
      <div className="fixed w-[1440px] h-[800px] z-[1]">
        <div className="absolute top-0 left-0 w-[1440px] h-[800px] bg-[url(/bg.svg)] bg-cover bg-[50%_50%]">
          <div className="w-[1440px] h-[800px] bg-[linear-gradient(122deg,rgba(22,14,51,1)_42%,rgba(22,14,51,0.3)_100%)] absolute top-0 left-0" />

          <div className="w-[1440px] h-[800px] bg-[linear-gradient(0deg,rgba(10,24,50,1)_0%,rgba(10,24,50,0)_100%)] absolute top-0 left-0" />
        </div>

        <header className="absolute top-0 left-0 w-[1440px] h-[100px] border border-solid border-[#676767]">
          <nav
            className="inline-flex items-center gap-[30px] px-[18px] py-9 absolute top-1 left-[420px]"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative w-fit mt-[-1.00px] [font-family:'Rubik-Regular',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal] whitespace-nowrap hover:opacity-80 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div
            className="absolute w-[8.82%] h-[40.00%] top-[30.00%] left-[9.10%] bg-[url(/blue-nomo-logo.png)] bg-[100%_100%]"
            role="img"
            aria-label="Nomo logo"
          />
        </header>

        <main className="absolute top-[159px] left-[172px] w-[1103px] h-[543px] flex flex-col">
          <h1 className="w-[1097px] h-[190px] [font-family:'Rubik-Bold',Helvetica] font-bold text-white text-[80px] text-center tracking-[0] leading-[normal]">
            Trade smarter while
            <br />
            Nomo does the work
          </h1>

          <p className="ml-[278px] w-[540px] h-[38px] mt-[17px] [font-family:'Rubik-Regular',Helvetica] font-normal text-white text-[32px] text-center tracking-[0] leading-[normal]">
            Coming Soon
          </p>

          <div
            className="ml-[373px] w-[350px] h-[70px] relative mt-6"
            role="timer"
            aria-label="Countdown timer"
          >
            <div className="w-[350px] h-[70px] bg-[#160e33] rounded-[64px] opacity-50 absolute top-0 left-0" />

            <div className="absolute top-2.5 left-[39px] w-[277px] h-[51px] flex gap-2.5">
              {countdownUnits.map((unit, index) => (
                <>
                  <div key={`unit-${index}`} className="flex">
                    <div className="inline-flex h-[51px] relative flex-col items-center">
                      <div
                        className="relative w-fit mt-[-1.00px] [font-family:'Rubik-Medium',Helvetica] font-medium text-[#00c4f4] text-3xl text-center tracking-[0] leading-[normal] whitespace-nowrap"
                        aria-label={`${unit.value} ${unit.label.toLowerCase()}`}
                      >
                        {formatTimeUnit(unit.value)}
                      </div>
                      <div className="relative w-fit [font-family:'Rubik-Regular',Helvetica] font-normal text-white text-[13px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        {unit.label}
                      </div>
                    </div>
                  </div>
                  {index < countdownUnits.length - 1 && (
                    <div
                      key={`separator-${index}`}
                      className="mt-[18px] w-1 h-[15px] [font-family:'Rubik-Regular',Helvetica] font-normal text-white text-[13px] text-center tracking-[0] leading-[normal] whitespace-nowrap"
                      aria-hidden="true"
                    >
                      :
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>

          <form
            className="ml-[263px] w-[570px] mt-6 flex gap-[18px]"
            onSubmit={handleSubscribe}
          >
            <div className="w-[395px] h-[60px] relative">
              <div className="absolute top-0 left-0 w-[393px] h-[60px] bg-white rounded-2xl border border-solid border-[#b6b6b6] shadow-[0px_20px_70px_#00265f1f]" />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="absolute top-[15px] left-[23px] w-[347px] [font-family:'TT_Hoves-Regular',Helvetica] font-normal text-[#4e545f] text-lg text-center tracking-[0] leading-[30px]"
                aria-label="Email address"
                required
              />
            </div>

            <button
              type="submit"
              className="all-[unset] box-border w-[157px] flex cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="inline-flex w-[157px] h-[60px] relative items-start gap-2.5 px-[35px] py-[15px] bg-button rounded-2xl">
                <span className="relative w-fit mt-[-1.00px] [font-family:'TT_Hoves-DemiBold',Helvetica] font-bold text-white text-lg text-center tracking-[0] leading-[30px] whitespace-nowrap">
                  Subscribe
                </span>
              </div>
            </button>
          </form>

          <p className="ml-[278px] w-[540px] h-[21px] mt-[37px] [font-family:'Rubik-Medium',Helvetica] font-medium text-white text-lg text-center tracking-[0] leading-[normal]">
            FOLLOW US
          </p>

          <nav
            className="ml-[351px] w-[395px] mt-[38px] flex"
            role="navigation"
            aria-label="Social media links"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`inline-flex h-6 relative items-center gap-3 hover:opacity-80 transition-opacity ${index === 0
                    ? "w-[123px]"
                    : index === 1
                      ? "w-[118px] ml-[30.2px]"
                      : "w-[94px] ml-[29.8px]"
                  }`}
                aria-label={social.name}
              >
                {social.icon}
                <span className="relative w-fit mt-[-1.00px] [font-family:'Rubik-Regular',Helvetica] font-normal text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                  {social.name}
                </span>
              </a>
            ))}
          </nav>
        </main>
      </div>
    </div>
  );
};
