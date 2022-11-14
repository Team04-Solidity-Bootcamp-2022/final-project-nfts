import ButtonSwapRequest from './buttons/ButtonSwapRequest';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import generateSvg from '../../utils/generateSvg';

const fetchUserTokens = async (address: any, pageToken: string) => {
  const response = await fetch(
    `/api/account-user-tokens?address=${address}&pageToken=${pageToken}`
  );
  return response.json();
};

const SwapRequest = ({ account, pageToken }: any) => {
  const { data, status } = useQuery(
    ['userTokens', account.address],
    () => fetchUserTokens(account.address, pageToken),
    { cacheTime: 0, retry: 1 }
  );

  return (
    <>
      <h2 className="ud-mb-3 ud-py-5 ud-text-3xl ud-font-bold ud-text-white sm:ud-mb-0 sm:ud-text-[28px] lg:ud-text-2xl xl:ud-text-[28px]">
        Swap Requests
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
        <div className="ud-mb-6 ud-flex ud-flex-wrap ud-items-center ud-justify-between ud-rounded-lg ud-border ud-border-stroke ud-bg-bg-color">
          <div className="ud-w-full sm:ud-w-1/2">
            <div className="ud-space-y-2 ud-border-stroke ud-p-6 sm:ud-border-r">
              <form className="ud-p-8 sm:ud-p-10">
                <div className="ud--mx-5 ud-flex ud-flex-wrap xl:ud--mx-8">
                  <div className="ud-w-full ud-px-5 xl:ud-px-8">
                    <div>
                      <div className="ud-mb-5">
                        <select
                          name="swapToken"
                          className="ud-w-full ud-rounded-md ud-border ud-border-stroke ud-bg-[#353444] ud-py-3 ud-px-6 ud-text-base ud-font-medium ud-text-body-color ud-outline-none ud-transition-all focus:ud-bg-[#454457] focus:ud-shadow-input"
                        >
                          {data.map((userToken: any) => (
                            <option
                              key={userToken.tokenId}
                              defaultValue={userToken.tokenId}
                            >
                              Token {userToken.tokenId}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="ud-w-full sm:ud-w-1/2 sm:ud-text-center">
            <div className="ud-space-y-3 ud-p-3">
              <p className="ud-inline-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-white ud-bg-opacity-10 ud-text-base ud-font-semibold ud-text-white">
                <ButtonSwapRequest />
              </p>
            </div>
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

export default SwapRequest;
