import { DiscoveryPlayer } from "@/types/scout/playerDicoverType";

export const Avatar = ({ player, size = 48 }: { player: DiscoveryPlayer; size?: number }) => {
  const initials = `${player.first_name[0]}${player.last_name[0]}`;
  const hue =
    (player.first_name + player.last_name)
      .split("")
      .reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  if (player.profile_image) {
    return (
      <img
        src={player.profile_image ?? ""}
        alt=""
        className="rounded-full object-cover border-2 border-[#1d3a55] flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold border-2 border-[#1d3a55] flex-shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.32,
        background: `linear-gradient(135deg, hsl(${hue},55%,28%), hsl(${hue},45%,18%))`,
      }}
    >
      {initials}
    </div>
  );
};