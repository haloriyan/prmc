import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import cities from "../../assets/cities.json";
import { useNavigate } from "react-router-dom";
import { MdWest } from "react-icons/md";
import axios from "axios";
import config from "../../config";
import InputFile from "../../components/InputFile";
import { BiCheck, BiTrash, BiUpload, BiX } from "react-icons/bi";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Popup from "../../components/Popup";
import Currency from "../../components/Currency";

const GigsAdd = () => {
    const [lang, setLang] = useLang();
    const user = JSON.parse(window.localStorage.getItem('user_data'));
    const navigate = useNavigate();
    const [isAddingPaket, setAddingPaket] = useState(false);
    const [buttonText, setButtonText] = useState(translation.general.add[lang]);

    const [title, setTitle] = useState('Maintenance AC');
    const [description, setDescription] = useState('AC Anda bermasalah? Kurang dingin? Serahkan pada kami!');
    const [address, setAddress] = useState('Jalan Bumiarjo 5 No. 11');
    const [phone, setPhone] = useState('');
    const [cover, setCover] = useState(null);
    const [pakets, setPakets] = useState([]);
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);
    const coverRef = useRef(null);

    const [paketTitle, setPaketTitle] = useState('Cuci AC');
    const [paketDescription, setPaketDescription] = useState('Membersihkan AC dari kotoran dan debu');
    const [paketPrice, setPaketPrice] = useState(120000);
    const [paketBenefits, setPaketBenefits] = useState(['Bongkar Pasang AC', 'Pembersihan Debu']);
    const [canSavePaket, setCanSavePaket] = useState(false);

    useEffect(() => {
        if (isAddingPaket && paketTitle !== "" && paketDescription !== "" && paketPrice > 0 && paketBenefits[0] !== "") {
            setCanSavePaket(true);
        } else {
            setCanSavePaket(false);
        }
    }, [isAddingPaket, paketTitle, paketDescription, paketPrice, paketBenefits]);

    useEffect(() => {
        if (title !== "" && description !== "" && pakets.length > 0 && location !== "") {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [title, description, pakets, location]);

    const submit = () => {
        setButtonText(translation.general.adding[lang]);
        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location.title);
        formData.append('address', address);
        formData.append('cover', cover);
        formData.append('phone', phone);
        formData.append('country', JSON.stringify({"name":"Indonesia","cca2":"ID"}));
        formData.append('pakets', JSON.stringify(pakets));

        axios.post(`${config.baseUrl}/api/service/store`, formData)
        .then(response =>{
            navigate(-1);
        })
    }

    const savePaket = (e) => {
        e.preventDefault();
        let paks = [...pakets];
        paks.push({
            name: paketTitle,
            description: paketDescription,
            price: paketPrice,
            benefits: paketBenefits,
        })
        setPakets(paks);
        setAddingPaket(false);
        setPaketTitle('');
        setPaketDescription('');
        setPaketPrice(0);
        setPaketBenefits(['']);
    }

    const removeBenefit = (index) => {
        let bens = [...paketBenefits];
        bens.splice(index, 1);
        setPaketBenefits(bens);
    }
    const removePaket = index => {
        let paks = [...pakets];
        paks.splice(index, 1);
        setPakets(paks);
    }

    return (
        <>
            <Header />
            <Sidebar active={'gigs'} />
            <div className="absolute top-16 right-0 w-9/12 mobile:w-full py-12 pe-8 mobile:p-8 flex flex-col">
                <div className="flex items-center gap-4">
                    <div className="cursor-pointer" onClick={() => navigate(-1)}>
                        <MdWest />
                    </div>
                    <div className="text-slate-700 font-bold text-xl">{translation.general.add[lang]} Gigs</div>
                </div>

                <div className="flex gap-4 mt-8">
                    <div className="w-6/12">
                        {
                            cover === null ?
                            <div className="w-full aspect-video relative">
                                <div className="w-full aspect-video rounded-lg border bg-slate-200 flex flex-col gap-4 items-center justify-center">
                                    <BiUpload size={24} />
                                    {translation.compose.choose[lang]} {translation.general.image[lang]}
                                </div>
                                <input type="file" className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer opacity-0" onInput={e => {
                                    let file = e.currentTarget.files[0];
                                    let reader = new FileReader();

                                    reader.onload = e => {
                                        coverRef.current.src = reader.result;
                                    }

                                    reader.readAsDataURL(file);
                                    setCover(file);
                                }} />
                            </div>
                            :
                            <img ref={coverRef} className="w-full aspect-video rounded-lg object-cover" />
                        }

                        <div className="flex flex-col gap-4 mt-8">
                            <Input label={translation.certificate.title[lang]} value={title} onInput={e => setTitle(e.currentTarget.value)} />
                            <Input label={translation.general.description[lang]} value={description} onInput={e => setDescription(e.currentTarget.value)} multiline style={{height: 150}} />
                            <Input label={translation.general.address[lang]} value={address} onInput={e => setAddress(e.currentTarget.value)} multiline style={{height: 150}} />
                            <div className="text-slate-500 text-xs">{translation.general.location[lang]}</div>
                            <Select 
                                options={cities} 
                                id="id"
                                label={"title"}
                                selectedVal={location}
                                handleChange={(val) => setLocation(val)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 grow">
                        {
                            pakets.map((pak, p) => (
                                <div key={p} className="border rounded-lg p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col gap-2 grow">
                                            <div className="text-slate-700 font-bold">{pak.name}</div>
                                            <div className="text-slate-500 text-xs">{Currency(pak.price).encode()}</div>
                                        </div>
                                        <button className="h-8 flex items-center justify-center bg-red-500 text-white aspect-square rounded-full" onClick={() => removePaket(p)}>
                                            <BiTrash />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4">
                                        {
                                            pak.benefits.map((ben, b) => (
                                                <div key={b} className="flex items-center gap-2">
                                                    <BiCheck color={'#2ecc71'} />
                                                    {ben}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <button className="w-full h-10 border border-primary text-primary text-sm" onClick={() => setAddingPaket(true)}>
                            {translation.general.add[lang]} {translation.services.package[lang]}
                        </button>
                    </div>
                </div>

                <button className="fixed bottom-10 right-10 p-3 px-6 font-bold bg-primary text-white" onClick={submit}>
                    {translation.general.add[lang]}
                </button>
            </div>

            {
                isAddingPaket &&
                <Popup onDismiss={() => setAddingPaket(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 font-bold flex grow">
                            {translation.general.add[lang]} {translation.services.package[lang]}
                        </div>
                        <div className="cursor-pointer" onClick={() => setAddingPaket(false)}>
                            <BiX />
                        </div>
                    </div>

                    <form onSubmit={savePaket}>
                        <Input label={`${translation.register.name[lang]}`} value={paketTitle} onInput={e => setPaketTitle(e.currentTarget.value)} required />
                        <Input label={`${translation.general.description[lang]}`} value={paketDescription} onInput={e => setPaketDescription(e.currentTarget.value)} required multiline />
                        <Input label={`${translation.general.price[lang]}`} value={Currency(paketPrice).encode()} onInput={e => {
                            // setPaketPrice(e.currentTarget.value)
                            let val = Currency(e.currentTarget.value).decode();
                            if (isNaN(val)) {
                                val = 0;
                            }
                            setPaketPrice(val);
                        }} required />

                        <div className="text-slate-500 text-xs">Benefit :</div>
                        {
                            paketBenefits.map((ben, b) => (
                                <Input label="" key={b} value={ben} onInput={e => {
                                    let bens = [...paketBenefits];
                                    bens[b] = e.currentTarget.value;
                                    setPaketBenefits(bens);
                                }} right={b > 0 && <div className="cursor-pointer" onClick={() => removeBenefit(b)}><BiX /></div>} />
                            ))
                        }
                        <div className="text-right text-primary text-sm cursor-pointer" onClick={() => {
                            let bens = [...paketBenefits];
                            bens.push('');
                            setPaketBenefits(bens);
                        }}>{translation.general.add[lang]} Benefit</div>

                        <button className="w-full bg-primary h-10 text-sm text-white" onClick={savePaket}>{translation.general.add[lang]}</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default GigsAdd