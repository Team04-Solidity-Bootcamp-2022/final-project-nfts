import ButtonSwapApprove from './buttons/ButtonSwapApprove';
import generateSvg from '../../utils/generateSvg';
import { generateName, generateUserName } from '../../utils/generateName';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';

const fetchSwapOffers = async (pageToken: string) => {
  const response = await fetch(`/api/get-swap-offers?pageToken=${pageToken}`);
  return response.json();
};

const SwapApprove = ({ pageToken }: any) => {
  const { data, status } = useQuery(
    ['fetchSwapOffers', pageToken],
    () => fetchSwapOffers(pageToken),
    { cacheTime: 0 }
  );

  return (
    <>
      <h2 className="ud-mb-3 ud-py-5 ud-text-3xl ud-font-bold ud-text-white sm:ud-mb-0 sm:ud-text-[28px] lg:ud-text-2xl xl:ud-text-[28px]">
        Swap Approvals
      </h2>

      {status === 'loading' && (
        <div className="ud-content-center">
          <ThreeCircles
            height="200"
            width="200"
            color="#5142FC"
            wrapperStyle={{}}
            wrapperClass="ud-justify-center"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      )}

      {status === 'success' && (
        <div className="ud-mb-8 ud-overflow-hidden ud-rounded-lg ud-border ud-border-stroke ud-bg-bg-color">
          <div className="ud-py-2">
            {data.map((offer: any, id: number) => (
              <div
                key={id}
                className="ud-flex ud-justify-between ud-py-[10px] ud-px-4 ud-transition hover:ud-bg-stroke"
              >
                <div className="ud-flex ud-items-center">
                  <div className="ud-mr-2 ud-h-10 ud-w-full ud-max-w-[40px] ud-rounded-md">
                    <img
                      src={`data:image/svg+xml;utf8,${generateSvg(
                        offer.swapTokenId
                      )}`}
                      alt="creator"
                      className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                    />
                  </div>
                  <div className="ud-w-full">
                    <h4 className="ud-text-sm ud-font-semibold ud-text-white">
                      @{generateUserName(offer.swapper)}
                      <span className="ud-block ud-text-sm ud-font-medium ud-text-body-color">
                        {generateName(offer.swapTokenId)}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="ud-text-right">
                  <ButtonSwapApprove offer={offer} pageToken={pageToken} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-dark ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5">
          N/A
        </div>
      )}
    </>
  );
};

export default SwapApprove;
