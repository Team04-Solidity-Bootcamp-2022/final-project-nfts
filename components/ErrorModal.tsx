import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

export default function ErrorModal({ title, text, cta, url }: any) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          location.reload();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ud-ease-out ud-duration-300"
          enterFrom="ud-opacity-0"
          enterTo="ud-opacity-100"
          leave="ud-ease-in ud-duration-200"
          leaveFrom="ud-opacity-100"
          leaveTo="ud-opacity-0"
        >
          <div className="ud-fixed ud-inset-0 ud-bg-gray-500 ud-bg-opacity-75 ud-transition-opacity" />
        </Transition.Child>

        <div className="ud-fixed ud-inset-0 ud-z-10 ud-overflow-y-auto">
          <div className="ud-flex ud-h-96 ud-items-end ud-justify-center ud-p-4 ud-text-center ud-sm:items-center ud-sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ud-ease-out ud-duration-300"
              enterFrom="ud-opacity-0 ud-translate-y-4 ud-sm:translate-y-0 ud-sm:scale-95"
              enterTo="ud-opacity-100 ud-translate-y-0 ud-sm:scale-100"
              leave="ud-ease-in ud-duration-200"
              leaveFrom="ud-opacity-100 ud-translate-y-0 ud-sm:scale-100"
              leaveTo="ud-opacity-0 ud-translate-y-4 ud-sm:translate-y-0 ud-sm:scale-95"
            >
              <Dialog.Panel className="ud-relative ud-transform ud-overflow-hidden ud-rounded-lg ud-bg-white ud-px-4 ud-pt-5 ud-pb-4 ud-text-left ud-shadow-xl ud-transition-all ud-sm:my-8 ud-sm:w-full ud-sm:max-w-lg ud-sm:p-6">
                <div className="ud-sm:flex ud-sm:items-start">
                  <div className="ud-mx-auto ud-flex ud-h-12 ud-w-12 ud-flex-shrink-0 ud-items-center ud-justify-center ud-rounded-full ud-bg-red-100 ud-sm:mx-0 ud-sm:h-10 ud-sm:w-10">
                    <ExclamationTriangleIcon
                      className="ud-h-6 ud-w-6 ud-text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ud-mt-3 ud-text-center ud-sm:mt-0 ud-sm:ml-4 ud-sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="ud-text-lg ud-font-medium ud-leading-6 ud-text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="ud-mt-2">
                      <p className="ud-text-sm ud-text-gray-500">{text}</p>
                    </div>
                  </div>
                </div>
                <div className="ud-mt-5 ud-sm:mt-4 ud-sm:flex ud-sm:flex-row-reverse">
                  <button
                    type="button"
                    className="ud-inline-flex ud-w-full ud-justify-center ud-rounded-md ud-border ud-border-transparent ud-bg-red-600 ud-px-4 ud-py-2 ud-text-base ud-font-medium ud-text-white ud-shadow-sm ud-hover:bg-red-700 ud-focus:outline-none ud-focus:ring-2 ud-focus:ring-red-500 ud-focus:ring-offset-2 ud-sm:ml-3 ud-sm:w-auto ud-sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                      location.reload();
                    }}
                  >
                    {cta}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
