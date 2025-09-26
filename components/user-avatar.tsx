import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserAvatar() {
  return (
    <Avatar className="size-10">
      <AvatarImage alt="user avatar" src="https://github.com/shadcn.png" />
      <AvatarFallback>us</AvatarFallback>
    </Avatar>
  );
}
