import {Card, CardContent, CardHeader, CardTitle} from "@/components/commons/ui/card";
import {BulletinForm} from "@/components/pages/dashboard/home-page/bulletin-form.tsx";

const HomePage = () => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Formulaire - Bulletin de service</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BulletinForm/>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Bulletins récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
                {/*   <img
                src={placeholder}
                alt="Placeholder Image"
                width={500}
                height={500}
              />*/}
            </div>
        </div>
    );
};

export default HomePage;
