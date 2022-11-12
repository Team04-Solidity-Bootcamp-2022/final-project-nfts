import { XCircleIcon } from '@heroicons/react/20/solid';

export default function ErrorAlert({ msg }: any) {
  return (
    <div className="ud-rounded-md ud-bg-red-50 ud-p-4 ud-w-full">
      <div className="ud-flex">
        <div className="ud-flex-shrink-0">
          <XCircleIcon
            className="ud-h-5 ud-w-5 ud-text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ud-ml-3">
          <h3 className="ud-text-sm ud-font-medium ud-text-red-800">{msg}</h3>
        </div>
      </div>
    </div>
  );
}
