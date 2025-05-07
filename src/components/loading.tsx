import { MoonLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center">
      <MoonLoader color="hsla(210, 96%, 40%, 1)" />
    </div>
  );
}
