import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import ErrorAlert from '../ErrorAlert';
import ButtonWithdraw from './buttons/ButtonWithdraw';

const fetchSales = async (address: any) => {
  const response = await fetch(`/api/account-sales?address=${address}`);
  return response.json();
};

const onSubmit = (event: any) => {
  event.preventDefault();
};

const MySales = ({ account }: any) => {
  const { data, status } = useQuery(
    ['mySales', account.address],
    () => fetchSales(account.address),
    { cacheTime: 0 }
  );
  return (
    <section className="ud-pb-14">
      <div className="ud-container">
        <h1 className="ud-mb-4 ud-text-[40px] ud-font-bold ud-leading-tight ud-text-white md:ud-text-[50px] lg:ud-text-[40px] xl:ud-text-[46px] 2xl:ud-text-[50px] sm:text-[46px]">
          My Sales
        </h1>

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
          <div className="ud-relative ud-z-10 ud-overflow-hidden ud-rounded-xl ud-bg-bg-color">
            <form className="ud-p-8 sm:ud-p-10" onSubmit={onSubmit}>
              <div className="ud--mx-5 ud-flex ud-flex-wrap xl:ud--mx-8">
                <div className="ud-w-full ud-px-5 xl:ud-px-8">
                  <div>
                    <div className="ud-mb-5">
                      <label className="ud-mb-2 ud-block ud-text-base ud-font-medium ud-text-white">
                        Sales
                      </label>
                      {data.proceeds !== '0.0' && (
                        <input
                          type="text"
                          name="title"
                          id="title"
                          defaultValue={`${data.proceeds} ETH`}
                          className="ud-w-full ud-rounded-md ud-border ud-border-stroke ud-bg-[#353444] ud-py-3 ud-px-6 ud-text-base ud-font-medium ud-text-body-color ud-outline-none ud-transition-all focus:ud-bg-[#454457] focus:ud-shadow-input"
                          readOnly
                        />
                      )}

                      {data.proceeds === '0.0' && (
                        <input
                          type="text"
                          name="title"
                          id="title"
                          defaultValue={`0 ETH`}
                          className="ud-w-full ud-rounded-md ud-border ud-border-stroke ud-bg-[#353444] ud-py-3 ud-px-6 ud-text-base ud-font-medium ud-text-body-color ud-outline-none ud-transition-all focus:ud-bg-[#454457] focus:ud-shadow-input"
                          readOnly
                        />
                      )}
                    </div>
                    {data.proceeds !== '0.0' && <ButtonWithdraw />}
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {status === 'error' && (
          <div className=" ud-w-full ud-flex ud-flex-wrap">
            <ErrorAlert msg="Try refreshing the page to load your sales" />
          </div>
        )}
      </div>
    </section>
  );
};

export default MySales;
