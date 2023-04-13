// import Accordion from 'components/shared/accordion';
import Input from 'components/shared/input';
import Text from 'components/shared/text';
import { useFormik } from 'formik';
import bedroom from 'public/images/bedroom.svg';
import bathroom from 'public/images/bathroom.svg';
import usd from 'public/images/usd.svg';
import { SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Accordion from 'components/shared/accordion';
import { useEffect, useState, Fragment } from 'react';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import { FormatLineSpacing } from '@mui/icons-material';
import * as Yup from 'yup';
import SimpleBar from 'simplebar-react';
import { Transition } from '@headlessui/react';

const NYCneighborhoods = [
  {id:1, name: 'Bath Beach' },
  {id:2, name: 'Allerton' },
  {id:3, name: 'Battery Park City' },
  {id:4, name: 'Arverne' },
  {id:5, name: 'Annadale' },
  {id:6, name: 'Bay Ridge' },
  {id:7, name: 'Bathgate' },
  {id:8, name: 'Beekman Place' },
  {id:9, name: 'Astoria' },
  {id:10, name: 'Arden Heights' },
  {id:11, name: 'Bedford Stuyvesant' },
  {id:12, name: 'Baychester' },
  {id:13, name: 'Carnegie Hill' },
  {id:14, name: 'Astoria Heights' },
  {id:15, name: 'Arlington' },
  {id:16, name: 'Bensonhurst' },
  {id:17, name: 'Bedford Park' },
  {id:18, name: 'Chelsea' },
  {id:19, name: 'Auburndale' },
  {id:20, name: 'Arrochar' },
  {id:21, name: 'Bergen Beach' },
  {id:22, name: 'Belmont' },
  {id:23, name: 'Chinatown' },
  {id:24, name: 'Bay Terrace' },
  {id:25, name: 'Bay Terrace' },
  {id:26, name: 'Boerum Hill' },
  {id:27, name: 'Bronxdale' },
  {id:28, name: 'Civic Center' },
  {id:29, name: 'Bayside' },
  {id:30, name: 'Bloomfield' },
  {id:31, name: 'Borough Park' },
  {id:32, name: 'Bronx Park South' },
  {id:33, name: 'Clinton' },
  {id:34, name: 'Bayswater' },
  {id:35, name: 'Bulls Head' },
  {id:36, name: 'Brighton Beach' },
  {id:37, name: 'Bronx River' },
  {id:38, name: 'East Harlem' },
  {id:39, name: 'Beechhurst' },
  {id:40, name: 'Butler Manor' },
  {id:41, name: 'Broadway Junction' },
  {id:42, name: 'Castle Hill' },
  {id:43, name: 'East Village' },
  {id:44, name: 'Bellaire' },
  {id:45, name: 'Castleton Corners' },
  {id:46, name: 'Brooklyn Heights' },
  {id:47, name: 'City Island' },
  {id:48, name: 'Financial District' },
  {id:49, name: 'Belle Harbor' },
  {id:50, name: 'Charleston' },
  {id:51, name: 'Brownsville' },
  {id:52, name: 'Claremont Village' },
  {id:53, name: 'Flatiron' },
  {id:54, name: 'Bellerose' },
  {id:55, name: 'Chelsea' },
  {id:56, name: 'Bushwick' },
  {id:57, name: 'Clason Point' },
  {id:58, name: 'Gramercy' },
  {id:59, name: 'Blissville' },
  {id:60, name: 'Clifton' },
  {id:61, name: 'Canarsie' },
  {id:62, name: 'Concourse' },
  {id:63, name: 'Greenwich Village' },
  {id:64, name: 'Breezy Point' },
  {id:65, name: 'Concord' },
  {id:66, name: 'Carroll Gardens' },
  {id:67, name: 'Concourse Village' },
  {id:68, name: 'Hamilton Heights' },
  {id:69, name: 'Briarwood' },
  {id:70, name: 'Dongan Hills' },
  {id:71, name: 'City Line' },
  {id:72, name: 'Co-op City' },
  {id:73, name: 'Harlem (Central)' },
  {id:74, name: 'Broad Channel' },
  {id:75, name: 'Egbertville' },
  {id:76, name: 'Clinton Hill' },
  {id:77, name: 'Country Club' },
  {id:78, name: 'Herald Square' },
  {id:79, name: 'Brookville' },
  {id:80, name: 'Elm Park' },
  {id:81, name: 'Cobble Hill' },
  {id:82, name: 'East Tremont' },
  {id:83, name: 'Hudson Square' },
  {id:84, name: 'Cambria Heights' },
  {id:85, name: 'Eltingville' },
  {id:86, name: 'Coney Island' },
  {id:87, name: 'Eastchester' },
  {id:88, name: 'Inwood' },
  {id:89, name: 'Clearview' },
  {id:90, name: 'Emerson Hill' },
  {id:91, name: 'Crown Heights' },
  {id:92, name: 'Edenwald' },
  {id:93, name: 'Lenox Hill' },
  {id:94, name: 'College Point' },
  {id:95, name: 'Fox Hills' },
  {id:96, name: 'Cypress Hills' },
  {id:97, name: 'Edgewater Park' },
  {id:98, name: 'Lincoln Square' },
  {id:99, name: 'Douglaston' },
  {id:100, name: 'Graniteville' },
  {id:101, name: 'Ditmas Park' },
  {id:102, name: 'Fieldston' },
  {id:103, name: 'Little Italy' },
  {id:104, name: 'Dutch Kills' },
  {id:105, name: 'Grant City' },
  {id:106, name: 'Downtown' },
  {id:107, name: 'Fordham' },
  {id:108, name: 'Lower East Side' },
  {id:109, name: 'East Elmhurst' },
  {id:110, name: 'Grasmere' },
  {id:111, name: 'DUMBO' },
  {id:112, name: 'High Bridge' },
  {id:113, name: 'Manhattan Valley' },
  {id:114, name: 'Edgemere' },
  {id:115, name: 'Great Kills' },
  {id:116, name: 'Dyker Heights' },
  {id:117, name: 'Hunts Point' },
  {id:118, name: 'Manhattanville' },
  {id:119, name: 'Elmhurst' },
  {id:120, name: 'Greenridge' },
  {id:121, name: 'East Flatbush' },
  {id:122, name: 'Kingsbridge' },
  {id:123, name: 'Midtown South' },
  {id:124, name: 'Far Rockaway' },
  {id:125, name: 'Grymes Hill' },
  {id:126, name: 'East New York' },
  {id:127, name: 'Kingsbridge Heights' },
  {id:128, name: 'Midtown' },
  {id:129, name: 'Floral Park' },
  {id:130, name: 'Heartland Village' },
  {id:131, name: 'East Williamsburg' },
  {id:132, name: 'Longwood' },
  {id:133, name: 'Morningside Heights' },
  {id:134, name: 'Flushing' },
  {id:135, name: 'Howland Hook' },
  {id:136, name: 'Farragut' },
  {id:137, name: 'Marble Hill' },
  {id:138, name: 'Murray Hill' },
  {id:139, name: 'Flushing (Downtown)' },
  {id:140, name: 'Huguenot' },
  {id:141, name: 'Flatbush' },
  {id:142, name: 'Melrose' },
  {id:143, name: 'NoHo' },
  {id:144, name: 'Forest Hills' },
  {id:145, name: 'Lighthouse Hill' },
  {id:146, name: 'Flatlands' },
  {id:147, name: 'Morris Heights' },
  {id:148, name: 'Roosevelt Island' },
  {id:149, name: 'Forest Hills Gardens' },
  {id:150, name: 'Livingston' },
  {id:151, name: 'Fort Greene' },
  {id:152, name: 'Morris Park' },
  {id:153, name: 'SoHo' },
  {id:154, name: 'Fresh Meadows' },
  {id:155, name: 'Manor Heights' },
  {id:156, name: 'Fort Hamilton' },
  {id:157, name: 'Morrisania' },
  {id:158, name: 'South Village' },
  {id:159, name: 'Glen Oaks' },
  {id:160, name: "Mariner's Harbor" },
  {id:161, name: 'Fulton Ferry' },
  {id:162, name: 'Mott Haven' },
  {id:163, name: 'Stuyvesant Town' },
  {id:164, name: 'Glendale' },
  {id:165, name: 'Midland Beach' },
  {id:166, name: 'Georgetown' },
  {id:167, name: 'Mount Eden' },
  {id:168, name: 'Sutton Place' },
  {id:169, name: 'Hammels' },
  {id:170, name: 'New Brighton' },
  {id:171, name: 'Gerritsen Beach' },
  {id:172, name: 'Mount Hope' },
  {id:173, name: 'Times Square' },
  {id:174, name: 'Hillcrest' },
  {id:175, name: 'New Dorp' },
  {id:176, name: 'Gowanus' },
  {id:177, name: 'North Riverdale' },
  {id:178, name: 'Tribeca' },
  {id:179, name: 'Hollis' },
  {id:180, name: 'New Dorp Beach' },
  {id:181, name: 'Gravesend' },
  {id:182, name: 'Norwood' },
  {id:183, name: 'Tudor City' },
  {id:184, name: 'Holliswood' },
  {id:185, name: 'New Springville' },
  {id:186, name: 'Greenpoint' },
  {id:187, name: 'Olinville' },
  {id:188, name: 'Turtle Bay' },
  {id:189, name: 'Howard Beach' },
  {id:190, name: 'Oakwood' },
  {id:191, name: 'Highland Park' },
  {id:192, name: 'Parkchester' },
  {id:193, name: 'Union Square' },
  {id:194, name: 'Hunters Point' },
  {id:195, name: 'Old Place' },
  {id:196, name: 'Homecrest' },
  {id:197, name: 'Pelham Bay' },
  {id:198, name: 'Upper East Side' },
  {id:199, name: 'Jackson Heights' },
  {id:200, name: 'Old Town' },
  {id:201, name: 'Pelham Gardens' },
  {id:202, name: 'Kensington' },
  {id:203, name: 'Upper West Side' },
  {id:204, name: 'Jamaica' },
  {id:205, name: 'Park Hill' },
  {id:206, name: 'Kings Highway' },
  {id:207, name: 'Pelham Parkway' },
  {id:208, name: 'Wall Street' },
  {id:209, name: 'Jamaica Center' },
  {id:210, name: 'Pleasant Plains' },
  {id:211, name: 'Manhattan Beach' },
  {id:212, name: 'Port Morris' },
  {id:213, name: 'Washington Heights' },
  {id:214, name: 'Jamaica Estates' },
  {id:215, name: 'Port Ivory' },
  {id:216, name: 'Manhattan Terrace' },
  {id:217, name: 'Riverdale' },
  {id:218, name: 'West Village' },
  {id:219, name: 'Jamaica Hills' },
  {id:220, name: 'Port Richmond' },
  {id:221, name: 'Mapleton' },
  {id:222, name: 'Schuylerville' },
  {id:223, name: 'Yorkville' },
  {id:224, name: 'Kew Gardens' },
  {id:225, name: "Prince's Bay" },
  {id:226, name: 'Marine Park' },
  {id:227, name: 'Soundview' },
  {id:228, name: 'Kew Gardens Hills' },
  {id:229, name: 'Randall Manor' },
  {id:230, name: 'Midwood' },
  {id:231, name: 'Spuyten Duyvil' },
  {id:232, name: 'Laurelton' },
  {id:233, name: 'Richmond Town' },
  {id:234, name: 'Mill Basin' },
  {id:235, name: 'Throgs Neck' },
  {id:236, name: 'Lefrak City' },
  {id:237, name: 'Richmond Valley' },
  {id:238, name: 'Mill Island' },
  {id:239, name: 'Unionport' },
  {id:240, name: 'Lindenwood' },
  {id:241, name: 'Rosebank' },
  {id:242, name: 'Navy Yard' },
  {id:243, name: 'University Heights' },
  {id:244, name: 'Little Neck' },
  {id:245, name: 'Rossville' },
  {id:246, name: 'New Lots' },
  {id:247, name: 'Van Nest' },
  {id:248, name: 'Long Island City' },
  {id:249, name: 'Sandy Ground' },
  {id:250, name: 'North Side' },
  {id:251, name: 'Wakefield' },
  {id:252, name: 'Malba' },
  {id:253, name: 'Shore Acres' },
  {id:254, name: 'Ocean Hill' },
  {id:255, name: 'West Farms' },
  {id:256, name: 'Maspeth' },
  {id:257, name: 'Silver Lake' },
  {id:258, name: 'Ocean Parkway' },
  {id:259, name: 'Westchester Square' },
  {id:260, name: 'Middle Village' },
  {id:261, name: 'South Beach' },
  {id:262, name: 'Paerdegat Basin' },
  {id:263, name: 'Williamsbridge' },
  {id:264, name: 'Murray Hill' },
  {id:265, name: 'St. George' },
  {id:266, name: 'Park Slope' },
  {id:267, name: 'Woodlawn' },
  {id:268, name: 'Neponsit' },
  {id:269, name: 'Stapleton' },
  {id:270, name: 'Plum Beach' },
  {id:271, name: 'New Hyde Park' },
  {id:272, name: 'Sunnyside' },
  {id:273, name: 'Prospect Heights' },
  {id:274, name: 'North Corona' },
  {id:275, name: 'Todt Hill' },
  {id:276, name: 'Prospect Lefferts Gardens' },
  {id:277, name: 'Oakland Gardens' },
  {id:278, name: 'Tompkinsville' },
  {id:279, name: 'Prospect Park South' },
  {id:280, name: 'Ozone Park' },
  {id:281, name: 'Tottenville' },
  {id:282, name: 'Red Hook' },
  {id:283, name: 'Pomonok' },
  {id:284, name: 'Travis' },
  {id:285, name: 'Remsen Village' },
  {id:286, name: 'Queens Village' },
  {id:287, name: 'Ward Hill' },
  {id:288, name: 'Rugby' },
  {id:289, name: 'Queensboro Hill' },
  {id:290, name: 'West Brighton' },
  {id:291, name: 'Sea Gate' },
  {id:292, name: 'Ravenswood' },
  {id:293, name: 'Westerleigh' },
  {id:294, name: 'Sheepshead Bay' },
  {id:295, name: 'Rego Park' },
  {id:296, name: 'Willowbrook' },
  {id:297, name: 'South Side' },
  {id:298, name: 'Richmond Hill' },
  {id:299, name: 'Woodrow' },
  {id:300, name: 'Spring Creek' },
  {id:301, name: 'Ridgewood' },
  {id:302, name: 'Starrett City' },
  {id:303, name: 'Rochdale' },
  {id:304, name: 'Stuyvesant Heights' },
  {id:305, name: 'Rockaway Park' },
  {id:306, name: 'Sunset Park' },
  {id:307, name: 'Rosedale' },
  {id:308, name: 'Tompkins Park North' },
  {id:309, name: 'Roxbury' },
  {id:310, name: 'Vinegar Hill' },
  {id:311, name: 'Seaside' },
  {id:312, name: 'Weeksville' },
  {id:313, name: 'Somerville' },
  {id:314, name: 'West Brighton' },
  {id:315, name: 'South Corona' },
  {id:316, name: 'Williamsburg' },
  {id:317, name: 'South Jamaica' },
  {id:318, name: 'Windsor Terrace' },
  {id:319, name: 'South Ozone Park' },
  {id:320, name: 'Wingate' },
  {id:321, name: 'Springfield Gardens' },
  {id:322, name: 'St. Albans' },
  {id:323, name: 'Steinway' },
  {id:324, name: 'Sunnyside' },
  {id:325, name: 'Sunnyside Gardens' },
  {id:326, name: 'Utopia' },
  {id:327, name: 'Whitestone' },
  {id:328, name: 'Woodhaven' },
  {id:329, name: 'Woodside' },
];



export default function LookingFor({ contactId }) {
  const LookingPropertySchema = Yup.object().shape({
    neighborhood_id: Yup.number().required('Field is required'),
    bedrooms_min: Yup.number().min(0, 'Minimum value is 0'),
    bedrooms_max: Yup.number()
      .min(0, 'Minimum value is 0')
      .when('bedrooms_min', {
        is: (val) => val && val >= 0,
        then: Yup.number().min(
          Yup.ref('bedrooms_min'),
          'Max bedrooms must be greater than min bedrooms'
        ),
      }),
    bathrooms_min: Yup.number().min(0, 'Minimum value is 0'),
    bathrooms_max: Yup.number()
      .min(0, 'Minimum value is 0')
      .when('bathrooms_min', {
        is: (val) => val && val >= 0,
        then: Yup.number().min(
          Yup.ref('bathrooms_min'),
          'Max bathrooms must be greater than min bathrooms'
        ),
      }),
    budget_min: Yup.number().min(0, 'Minimum value is 0'),
    // budget_min: Yup.number().transform((o, v) => Number(v.replace(/,/g, ''))).min(0, 'Minimum value is 0'),
    budget_max: Yup.number()
      .min(0, 'Minimum value is 0')
      .when('budget_min', {
        is: (val) => val && val >= 0,
        then: Yup.number().min(
          Yup.ref('budget_min'),
          'Max budget must be greater than min budget'
        ),
      }),
  });

  //* FORMIK *//
  const [selections, setSelections] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);

  const formik = useFormik({
    initialValues: {
      neighborhood_id: '',
      looking_action: 'sell',
      bedrooms_min: '',
      bedrooms_max: '',
      bathrooms_min: '',
      bathrooms_max: '',
      budget_min: '',
      budget_max: '',
    },
    validationSchema: LookingPropertySchema,
    onSubmit: (values) => {
      console.log('looking property', values);
      handleAddSubmit(values);
    },
  });

  const { errors, touched, setFieldValue } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      const res = await contactServices.addContactLookingProperty(
        contactId,
        values
      );
      console.log('add', res);
      // setHasLookingProperty(true);
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const fetchLookingProperties = async () => {
    try {
      const { data } = await contactServices.getContactLookingProperties(
        contactId
      );
      const lookingProperties = data.data;
      if (lookingProperties.length > 0) {
        formik.setValues({
          neighborhood_id: lookingProperties[0].neighborhood_id,
          looking_action: lookingProperties[0].looking_action,
          bedrooms_min:
            lookingProperties[0].bedrooms_min != 0
              ? lookingProperties[0].bedrooms_min
              : '',
          bedrooms_max:
            lookingProperties[0].bedrooms_max != 0
              ? lookingProperties[0].bedrooms_max
              : '',
          bathrooms_min:
            lookingProperties[0].bathrooms_min != 0
              ? lookingProperties[0].bathrooms_min
              : '',
          bathrooms_max:
            lookingProperties[0].bathrooms_max != 0
              ? lookingProperties[0].bathrooms_max
              : '',
          budget_min:
            lookingProperties[0].budget_min != 0
              ? lookingProperties[0].budget_min
              : '',
          budget_max:
            lookingProperties[0].budget_max != 0
              ? lookingProperties[0].budget_max
              : '',
        });
        let filterNeighborhoodInput = NYCneighborhoods.find(neighborhood => neighborhood.id == lookingProperties[0].neighborhood_id)
        setNeighborhoodInput(filterNeighborhoodInput.name)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLookingProperties();

  }, [contactId]);


  const [neighborhoodsSearched, setNeighborhoodsSearched] = useState([]);
  const [neighborhoodsDropdown, setNeighborhoodsDropdown] = useState(false);
  const [neighborhoodInput, setNeighborhoodInput] = useState('');

  // useEffect(() => {
  //   neighborhoodSearchKey.length > 2 ? fetchNeighborhoods() : setNeighborhoodsDropdown(false);
  // }, [neighborhoodSearchKey]);

  const fetchNeighborhoods = (searchKey) => {
    if(searchKey.length > 2) {
      let filterNeighborhoods = NYCneighborhoods.filter(neighborhood => neighborhood.name.toLowerCase().includes(searchKey.toLowerCase()));
      // console.log('filterNeighborhoods', filterNeighborhoods)
      setNeighborhoodsSearched(filterNeighborhoods);
      setNeighborhoodsDropdown(true);

    } else {
      setNeighborhoodsDropdown(false);
      formik.setFieldValue('neighborhood_id', '');
    }
   
  }
  const handleChooseNeighborhoods = (neighborhood) => {
    setNeighborhoodsDropdown(false);
    formik.setFieldValue('neighborhood_id', neighborhood.id);
    setNeighborhoodInput(neighborhood.name);
  };

  const tabs = [
    {
      title: 'AMENITIES',
      value: 'amenities',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="bedrooms_min"
            type="number"
            label="Bedrooms Min"
            iconAfter={<Image src={bedroom} height={20} />}
            className="col-span-1"
            onChange={formik.handleChange}
            value={formik.values.bedrooms_min}
            error={errors.bedrooms_min && touched.bedrooms_min}
            errorText={errors.bedrooms_min}
          />
          <Input
            id="bedrooms_max"
            type="number"
            label="Bedrooms Max"
            className="col-span-1"
            iconAfter={<Image src={bedroom} height={20} />}
            onChange={formik.handleChange}
            value={formik.values.bedrooms_max}
            error={errors.bedrooms_max && touched.bedrooms_max}
            errorText={errors.bedrooms_max}
          />
          <Input
            id="bathrooms_min"
            type="number"
            label="Bathrooms Min"
            iconAfter={<Image src={bathroom} height={20} />}
            className="col-span-1"
            onChange={formik.handleChange}
            value={formik.values.bathrooms_min}
            error={errors.bathrooms_min && touched.bathrooms_min}
            errorText={errors.bathrooms_min}
          />
          <Input
            id="bathrooms_max"
            type="number"
            label="Bathrooms Max"
            className="col-span-1"
            iconAfter={<Image src={bathroom} height={20} />}
            onChange={formik.handleChange}
            value={formik.values.bathrooms_max}
            error={errors.bathrooms_max && touched.bathrooms_max}
            errorText={errors.bathrooms_max}
          />
        </div>
      ),
    },
    {
      title: 'BUDGET MIN/MAX',
      value: 'budget',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="budget_min"
            type="number"
            label="Budget Min"
            iconAfter={<Image src={usd} height={20} />}
            className="col-span-1"
            onChange={formik.handleChange}
            value={formik.values.budget_min}
            error={errors.budget_min && touched.budget_min}
            errorText={errors.budget_min}
          />
          <Input
            id="budget_max"
            type="number"
            label="Budget Max"
            iconAfter={<Image src={usd} height={20} />}
            className="col-span-1"
            // onChange={(e)=>{
            // formik.handleChange('budget_max');
            // console.log(e.target.value, e.target.value.slice(0,-3), Number(e.target.value.replace(',','')))
            // const test = (Number((e.target.value).toString().replace(/\D/g, '')) || '').toLocaleString(undefined, {
            //   minimumFractionDigits: 2,
            //   maximumFractionDigits: 2
            // });
            // test.slice(0,-3).replace(',',''),

            // console.log(
            //   (Number((e.target.value).toString().replace(/\D/g, '')) || '').toLocaleString(),
            //   test,
            //   test.slice(0,-3),
            //   test.slice(0,-3).replace(',',''),

            // )
            // console.log('test', test, e.target.value, test.slice(0,-3).replace(',',''))
            // formik.setFieldValue('budget_max', Number((e.target.value.replace(',',''))));
            // formik.setFieldValue('budget_max', test.slice(0,-3).replace(',',''));

            // }}
            onChange={formik.handleChange}
            value={formik.values.budget_max}
            // value={(Number((formik.values.budget_max).toString().replace(/\D/g, '')) || '').toLocaleString()}
            // value={(Number((formik.values.budget_max).toString().replace(/\D/g, '')) || '').toLocaleString(undefined, {
            //   minimumFractionDigits: 2,
            //   maximumFractionDigits: 2
            // })}
            error={errors.budget_max && touched.budget_max}
            errorText={errors.budget_max}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex bg-gray10 flex-row details-tabs-fixed-height overflow-y-scroll">
      <div className="w-[65%] bg-gray10">
        <div className="bg-white p-6 m-[24px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="max-w-3xl mx-auto relative">
              {/* <Input
                id="neighborhood_id"
                type="number"
                label="Neighborhood"
                iconAfter={<SearchIcon className="text-gray3" height={20} />}
                onChange={formik.handleChange}
                value={formik.values.neighborhood_id}
                error={errors.neighborhood_id && touched.neighborhood_id}
                errorText={errors.neighborhood_id}
              /> */}
               {/* <div className="my-6 relative"> */}
                <Input
                  id="searchNeighborhoods"
                  type="dropdown"
                  label="Neighborhood"
                  // placeholder="Name Lastname or email..."
                  iconAfter={<SearchIcon className="text-gray3" height={20} />}
                  onChange={(event) => {
                    setNeighborhoodInput(event.target.value)
                    fetchNeighborhoods(event.target.value)}
                  }
                  // value={formik.values.neighborhood_id}
                  value={neighborhoodInput}
                  error={errors.neighborhood_id && touched.neighborhood_id}
                  errorText={errors.neighborhood_id}
                />
                <Transition
                  show={neighborhoodsDropdown}
                  as={Fragment}
                  enter="transition-opacity ease-in duration-100"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    className={`z-20 shadow rounded overflow-hidden absolute top-16 w-[100%] bg-white h-38`}
                  >
                    <SimpleBar style={{ maxHeight: '100%' }}>
                      {neighborhoodsSearched.map((neighborhood) => (
                        <div
                          onClick={() => handleChooseNeighborhoods(neighborhood)}
                          key={neighborhood.id}
                          className="flex flex-row p-3 hover:bg-lightBlue1 cursor-pointer group"
                        >
                          <Text className="text-gray6" h4>
                              {neighborhood.name}
                            </Text>
                        </div>
                      ))}
                    </SimpleBar>
                  </div>
                </Transition>
              {/* </div> */}
            </div>
            <Accordion
              tabs={tabs}
              activeSelections={selections}
              defaultOpen={true}
            />
            <Button
              type="submit"
              primary
              className="mt-6"
              loading={loadingButton}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
