import UserAvatar from "./user-avatar";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="py-4 px-10 bg-card flex justify-between items-center">
      <span>logo</span>
      <ul className="flex-1 flex justify-center gap-8">
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">Sell</a>
        </li>
        <li>
          <a href="">Sales</a>
        </li>
        <li>
          <a href="">Buying</a>
        </li>
      </ul>
      <div className="flex justify-center items-center gap-4">
        <ModeToggle />
        <UserAvatar />
      </div>
    </header>
  );
}
