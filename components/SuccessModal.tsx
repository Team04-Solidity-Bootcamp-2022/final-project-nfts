import { CheckCircleIcon } from '@heroicons/react/20/solid';

export default function SuccessModal() {
  return (
    <div className="ud-rounded-md ud-bg-green-50 ud-p-4">
      <div className="ud-flex">
        <div className="ud-flex-shrink-0">
          <CheckCircleIcon
            className="ud-h-5 ud-w-5 ud-text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ud-ml-3">
          <p className="ud-text-sm ud-font-medium ud-text-green-800">Success</p>
        </div>
      </div>
    </div>
  );
}
