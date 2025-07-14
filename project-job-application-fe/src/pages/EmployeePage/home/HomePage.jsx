import CardItem from "../../../components/Card/CardItem";
import CompanyMapList from "../../../components/CompanyMap/CompanyMapList";

function HomePage({ listCompany }) {
  return (
    <div className="bg-page containerPage">
      <CardItem data={listCompany}/>
      <CompanyMapList data={listCompany} />
    </div>
  );
}

export default HomePage;
