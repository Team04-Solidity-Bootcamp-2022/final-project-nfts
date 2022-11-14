import ButtonSwapApprove from './buttons/ButtonSwapApprove';
import generateSvg from '../../utils/generateSvg';
import { generateName, generateUserName } from '../../utils/generateName';
const SwapApprove = () => {
  const data = [
    {
      tokenId: 1,
    },
    {
      tokenId: 2,
    },
  ];
  return (
    <>
      <h2 className="ud-mb-3 ud-py-5 ud-text-3xl ud-font-bold ud-text-white sm:ud-mb-0 sm:ud-text-[28px] lg:ud-text-2xl xl:ud-text-[28px]">
        Swap Approvals
      </h2>
      <div className="ud-mb-8 ud-overflow-hidden ud-rounded-lg ud-border ud-border-stroke ud-bg-bg-color">
        <div className="ud-py-2">
          {data.map((token: any) => (
            <div
              key={token}
              className="ud-flex ud-justify-between ud-py-[10px] ud-px-4 ud-transition hover:ud-bg-stroke"
            >
              <div className="ud-flex ud-items-center">
                <div className="ud-mr-2 ud-h-10 ud-w-full ud-max-w-[40px] ud-rounded-md">
                  <img
                    src={`data:image/svg+xml;utf8,${generateSvg(token)}`}
                    alt="creator"
                    className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                  />
                </div>
                <div className="ud-w-full">
                  <h4 className="ud-text-sm ud-font-semibold ud-text-white">
                    @{generateUserName(token)}
                    <span className="ud-block ud-text-sm ud-font-medium ud-text-body-color">
                      {generateName(token)}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="ud-text-right">
                <ButtonSwapApprove />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SwapApprove;
