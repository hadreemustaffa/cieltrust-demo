type Icon = {
  SvgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isBorderless?: boolean;
};

function Icon({ SvgIcon, isBorderless }: Icon) {
  return (
    <div
      className={`flex rounded-md ${isBorderless ? "" : "border border-accent/10 p-2"}`}
    >
      <SvgIcon />
    </div>
  );
}

export default Icon;
