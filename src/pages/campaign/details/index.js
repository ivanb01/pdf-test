import { useRouter } from "next/router";
import SimpleBar from "simplebar-react";
import MainMenu from "@components/shared/menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@components/shared/button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import allEventsIcon from "../../../../public/images/campaign/allEventsIcon.svg";
import campaignsMatchedTo from "../../../../public/images/campaign/campaignsMatchedTo.svg";
import inCampaign from "../../../../public/images/campaign/inCampaign.svg";
import notInCampaign from "../../../../public/images/campaign/notInCampaign.svg";
import ButtonsSlider from "@components/shared/button/buttonsSlider";
import { useEffect, useState } from "react";
import Search from "@components/shared/input/search";
import { useDispatch, useSelector } from "react-redux";
import CampaignPreview from "@components/campaign/CampaignPreview";
import { getAllEvents, getCampaign, getCampaignPagination, getCampaignsByCategory } from "@api/campaign";
import { setCRMCampaigns, setUsersInCampaignGlobally } from "@store/campaigns/slice";
import Loader from "@components/shared/loader";
import { PencilIcon } from "@heroicons/react/solid";
import EditCampaignSidebar from "@components/CampaignActionSidebar/EditCampaignSidebar";
import { capitalize, getContactTypeByTypeId } from "@global/functions";
import AllCampaignContactsTable from "@components/shared/table/AllCampaignContactsTable";
import NotInCampaignContactsTable from "@components/shared/table/NotInCampaignContactsTable";
import InCampaignContactsTable from "@components/shared/table/InCampaignContactsTable";
import useInfiniteScroll from "react-infinite-scroll-hook";
import SpinnerLoader from "@components/shared/SpinnerLoader";
import toast from "react-hot-toast";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentButton, setCurrentButton] = useState(0);
  const { CRMCampaigns, usersInCampaignGlobally } = useSelector((state) => state.CRMCampaigns);
  const [campaignDetails, setCampaignDetails] = useState();
  const [campaignEvents, setCampaignEvents] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [openCampaignPreview, setOpenCampaignPreview] = useState(false);
  const [showEditCampaign, setShowEditCampaign] = useState(false);
  const [category, setCategory] = useState("");
  const [paginationItems, setPaginationItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const getEvents = () => {
    getAllEvents(id).then((res) => {
      setCampaignEvents(res.data);
    });
  };

  useEffect(() => {
    if (id) {
      Promise.all([getEvents(), getCampaignPagination(id, offset), getCampaign(id)])
        .then(([_, paginationResponse, campaignResponse]) => {
          setPaginationItems(processContacts(paginationResponse.data.contacts));
          setOffset(offset + paginationResponse.data.count);
          dispatch(setUsersInCampaignGlobally(campaignResponse.data));
        })
        .catch((error) => {
          console.error("Error executing requests:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) getEvents();
  }, [campaignDetails]);

  const loadItems = () => {
    return getCampaignPagination(id, offset)
      .then((response) => {
        return {
          hasNextPage: true,
          data: response.data.contacts,
          count: response.data.count,
          total: response.data.total_count,
        };
      })
      .catch((error) => {
        toast.error("Error while loading items");
        throw error;
      });
  };
  async function loadMore() {
    if (loadingPagination) return;

    setLoadingPagination(true);
    try {
      const { data, count, hasNextPage: newHasNextPage } = await loadItems(offset);
      setPaginationItems((current) => {
        const processedContacts = processContacts(data);

        const combinedArray = [...current, ...processedContacts];
        return Array.from(new Set(combinedArray));
      });

      setOffset(offset + count);

      setHasNextPage(newHasNextPage);
      if (count === 0) {
        setHasNextPage(false);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoadingPagination(false);
    }
  }
  const processContacts = (contacts) => {
    return contacts.map((contact) => {
      const {
        contact_email,
        contact_first_name,
        contact_last_name,
        contact_id,
        import_source,
        import_source_text,
        last_communication_date,
        profile_image_path,
        campaign_contact,
      } = contact;

      const contact_enrollment_date = campaign_contact ? campaign_contact.enrollment_date : null;
      const contact_unenrolment_date = campaign_contact ? campaign_contact.unenrollment_date : null;
      const event_sent = campaign_contact ? campaign_contact.event_sent : null;
      const events_preview = campaign_contact ? campaign_contact.events_preview : null;
      const contact_campaign_status = campaign_contact ? campaign_contact?.contact_campaign_status : "never_assigned";

      return {
        contact_first_name,
        contact_last_name,
        contact_id,
        contact_email,
        import_source,
        import_source_text,
        last_communication_date,
        profile_image_path,
        contact_enrollment_date,
        contact_unenrolment_date,
        event_sent,
        events_preview,
        contact_campaign_status,
      };
    });
  };
  useEffect(() => {
    console.log(paginationItems);
  }, [paginationItems]);
  useEffect(() => {
    if (usersInCampaignGlobally?.contact_category_id) {
      setCategory(getContactTypeByTypeId(null, usersInCampaignGlobally.contact_category_id));
    }
  }, [usersInCampaignGlobally]);

  useEffect(() => {
    if (CRMCampaigns === undefined) {
      getCampaignsByCategory("Client").then((res) => {
        dispatch(setCRMCampaigns(res.data));
        let foundCampaign = res.data.campaigns.find((c) => c.campaign_id == id);
        if (foundCampaign?.contact_category_id) {
          setCategory(getContactTypeByTypeId(null, foundCampaign.contact_category_id));
        }
        setCampaignDetails(foundCampaign);
      });
    } else if (CRMCampaigns !== undefined) {
      const campaign = CRMCampaigns?.campaigns.find((c) => c.campaign_id == id);
      setCategory(getContactTypeByTypeId(null, campaign.contact_category_id));
      setCampaignDetails(campaign);
    }
  }, [CRMCampaigns, id]);

  const totalContacts = usersInCampaignGlobally?.contacts.filter((contact) =>
    contact.contact_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const inCampaignContacts = usersInCampaignGlobally?.contacts_in_campaign.filter((contact) =>
    contact.contact_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const notInCampaignContacts = usersInCampaignGlobally?.contacts_not_campaign.filter((contact) =>
    contact.contact_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const eventTypes = [
    {
      name: "ALL EVENTS",
      icon: allEventsIcon,
      amount: usersInCampaignGlobally?.events.count,
    },
    {
      name: "CAMPAIGN MATCHED TO",
      icon: campaignsMatchedTo,
      amount: usersInCampaignGlobally?.contacts?.length,
    },
    {
      name: "CLIENTS IN CAMPAIGN",
      icon: inCampaign,
      amount: usersInCampaignGlobally?.contacts_in_campaign?.length,
    },
    {
      name: "Unassigned + Never Assigned",
      icon: notInCampaign,
      amount:
        usersInCampaignGlobally?.contacts_not_campaign?.length + usersInCampaignGlobally?.contacts_unassigned_count,
    },
  ];
  const buttons = [
    {
      id: 0,
      name: `${
        category == "Unknown"
          ? "All Clients"
          : `All ${capitalize(category)}s - ${usersInCampaignGlobally?.contact_status_2}`
      }`,
      count: paginationItems.length,
    },
    {
      id: 1,
      name: "In Campaign",
      count: usersInCampaignGlobally?.contacts_in_campaign?.length,
    },
    {
      id: 2,
      name: "Not In Campaign",
      count: usersInCampaignGlobally?.contacts_not_campaign?.length,
    },
  ];

  useEffect(() => {
    //this is done to detect back button on client details
    localStorage.removeItem("id");
    localStorage.removeItem("category");
  }, []);

  useEffect(() => {
    setSearchTerm("");
  }, [currentButton]);
  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: loadingPagination,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
  });
  const updatePaginationContacts = (person) => {
    const updatedPaginationItems = paginationItems.map((item) => {
      if (person?.contact_id === item.contact_id) {
        let updatedItem = {};
        if (person?.contact_campaign_status === "never_assigned") {
          updatedItem = {
            ...item,
            contact_campaign_status: "assigned",
            contact_enrollment_date: new Date(),
          };
        } else if (person?.contact_campaign_status === "assigned") {
          updatedItem = {
            ...item,
            contact_campaign_status: "unassigned",
            contact_unenrolment_date: new Date(),
          };
        }
        return updatedItem;
      } else {
        return item;
      }
    });

    setPaginationItems(updatedPaginationItems);
  };
  const renderTable = (currentButton) => {
    switch (currentButton) {
      case 0:
        return (
          <SimpleBar style={{ height: "calc(100vh - 388px)" }} autoHide>

            <div>
              <AllCampaignContactsTable
                ref={rootRef}
                campaignData={campaignEvents}
                campaignId={id}
                tableFor={"allCampaignContacts"}
                campaignFor={
                  category == "Unknown"
                    ? "All Clients"

                    : `${capitalize(category)} - ${usersInCampaignGlobally?.contact_status_2}`
                }
                updatePaginationContacts={updatePaginationContacts}
                campaignPreviewData={totalContacts}
                setPaginationItems={setPaginationItems}
                paginationItems={paginationItems}
                categoryType={category}
                status={usersInCampaignGlobally?.contact_status_1}
                status_2={usersInCampaignGlobally?.contact_status_2}
              />
              {hasNextPage && (
                <div ref={infiniteRef}>
                  <SpinnerLoader />
                </div>
              )}
            </div>
          </SimpleBar>
        );
      case 1:
        return (
          <SimpleBar style={{ height: "calc(100vh - 388px)" }} autoHide>
            <InCampaignContactsTable
              tableFor={"inCampaignContacts"}
              data={inCampaignContacts}
              updatePaginationContacts={updatePaginationContacts}
              setCurrentButton={setCurrentButton}
              categoryType={category}
              status={usersInCampaignGlobally?.contact_status_1}
              status_2={usersInCampaignGlobally?.contact_status_2}
            />
          </SimpleBar>
        );
      case 2:
        return (
          <SimpleBar style={{ height: "calc(100vh - 388px)" }} autoHide>
            <NotInCampaignContactsTable
              tableFor={"notInCampaignContacts"}
              data={notInCampaignContacts}
              updatePaginationContacts={updatePaginationContacts}
              categoryType={category}
              status={usersInCampaignGlobally?.contact_status_1}
              status_2={usersInCampaignGlobally?.contact_status_2}
            />
          </SimpleBar>
        );
    }
  };

  return (
    <>
      <MainMenu />
      {!campaignEvents || !CRMCampaigns || !usersInCampaignGlobally ? (
        <div className="relative h-[90vh]">
          <Loader />
        </div>
      ) : (
        <>
          <EditCampaignSidebar
            setCampaignDetails={setCampaignDetails}
            campaignData={campaignDetails}
            open={showEditCampaign}
            setOpen={setShowEditCampaign}
            id={id}
          />
          <div className={"p-6 flex justify-between"}>
            <div className={"flex gap-4 items-start"}>
              <ArrowBackIosIcon
                className={"text-lightBlue3 h-4 w-4 mt-2 cursor-pointer"}
                onClick={() => router.push("/campaign")}
              />
              <div>
                <h4 className={"text-xl leading-7 font-medium text-gray7 mb-2"}>{campaignDetails?.name}</h4>
                <div className={"px-1.5 py-0.5 bg-gray1 flex items-center justify-start w-max"}>
                  <span className={"text-xs leading-5 font-medium text-gray6"}>
                    {category == "Unknown"
                      ? "All Clients"
                      : `${capitalize(category)}s : ${usersInCampaignGlobally?.contact_status_2}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                secondary
                leftIcon={<PencilIcon className={"h-4 w-4"} />}
                className="mr-4"
                onClick={() => setShowEditCampaign(true)}>
                Edit Campaign
              </Button>
              <Button
                primary
                leftIcon={<VisibilityIcon className={"h-4 w-4"} />}
                onClick={() => setOpenCampaignPreview(true)}>
                Campaign Preview
              </Button>
            </div>
          </div>
          <div className={"p-6 grid grid-cols-4 gap-2.5 border-y border-gray2"}>
            {eventTypes.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2.5 items-center justify-center 
              `}>
                <div className={"flex gap-3 items-center justify-center"}>
                  <img src={event.icon.src} className={"h-[32px] w-[32px]"} alt={""} />
                  <span className="text-gray4  text-center font-medium text-xs leading-5">
                    {event.name.toUpperCase()}
                  </span>
                </div>
                <span className={"text-lg leading-6 font-semibold text-gray7"}>{event.amount}</span>
              </div>
            ))}
          </div>
          <div className={"border-b border-gray2 h-[96px] flex p-6 items-center justify-between"}>
            <ButtonsSlider buttons={buttons} currentButton={currentButton} onClick={setCurrentButton} />
            <Search
              placeholder="Search"
              className="mr-4 text-sm"
              value={searchTerm}
              onInput={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          {renderTable(currentButton)}
          <CampaignPreview
            data={campaignEvents}
            className="top-[70px]"
            campaignFor={
              category == "Unknown"
                ? "All Clients"
                : `${capitalize(category)} - ${usersInCampaignGlobally?.contact_status_2}`
            }
            campaignId={id}
            open={openCampaignPreview}
            setOpen={setOpenCampaignPreview}
          />
        </>
      )}
    </>
  );
};

export default index;

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
