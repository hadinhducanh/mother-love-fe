

interface Props {
    pageName: string;
    singleName: string;
    pictureUrl: string;
  }
  
  const Banner = ({ pageName, singleName, pictureUrl }: Props) => (
    <div className="page-banner-section section" style={{ backgroundImage: `url(${pictureUrl})`}}>
    <div className="container">
        <div className="row">
            <div className="page-banner-content col">

                <h1>{pageName}</h1>
                <ul className="page-breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">{singleName}</a></li>
                </ul>

            </div>
        </div>
    </div>
</div>
  );
  
  export default Banner;
   