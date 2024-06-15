import React, { useEffect, useRef, useState } from "react";
import styles from './styles/Register.module.css';
import Input from "../components/Input";
import Button from "../components/Button";
import Popup from "../components/Popup";
import TitleAdmin from "../Partials/TitleAdmin";
import { BiCircle, BiDotsHorizontal, BiX } from "react-icons/bi";
import InputFile from "../components/InputFile";
import Switch from "../components/Switch";
import axios from "axios";
import Select from 'react-select';
import config from "../config";

const TCRegister = () => {
    const [countries, setCountries] = useState([]);
    const [icon, setIcon] = useState(null);
    const [name, setName] = useState('Raya Digitalisasi Indonesia');
    const [description, setDescription] = useState('Lorem ipsum dulu aja');
    const [email, setEmail] = useState('halo@gmail.com');
    const [phone, setPhone] = useState('+6285159772902');
    const [website, setWebsite] = useState('https://dailyhotels.id');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [isDone, setDone] = useState(false);

    const [isLoading, setLoading] = useState(true);

    const [courses, setCourses] = useState([]);

    const [isAddingProgram, setAddingProgram] = useState(false);

    const [programTitle, setProgramTitle] = useState('Contoh program');
    const [programDescription, setProgramDescription] = useState('Lorem ipsum aja');
    const [programImage, setProgramImage] = useState(null);
    const [programCert, setProgramCert] = useState(true);
    const [programOnline, setProgramOnline] = useState(true);
    const [programDuration, setProgramDuration] = useState(1);
    const [programDurationUnit, setProgramDurationUnit] = useState('Hours');
    const [programLessonLength, setProgramLessonLength] = useState(1);

    const programCoverInputs = useRef([]);
    const tcCoverInputs = useRef([]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                let conts = response.data;
                let theCountries = [...countries];
                conts.map((cont, c) => {
                    theCountries.push({
                        label: cont.name.common,
                        value: JSON.stringify({
                            name: cont.name.common,
                            cca2: cont.cca2
                        }),
                    });
                })
                setCountries(theCountries);
            })
        }
    }, [isLoading]);

    const saveProgram = (e) => {
        let theCourses = [...courses];
        let reader = new FileReader();
        reader.readAsDataURL(programImage);

        reader.addEventListener('load', () => {
            theCourses.push({
                title: programTitle,
                description: programDescription,
                cover: programImage,
                cover_uri: reader.result,
                is_online: programOnline,
                is_certified: programCert,
                duration: `${programDuration} ${programDurationUnit}`,
                lessons: programLessonLength,
            });
            programCoverInputs.current.push(programImage);

            setCourses(theCourses);

            setProgramTitle('');
            setProgramDescription('');
            setProgramImage(null);
            setProgramOnline(true);
            setProgramCert(true);
            setAddingProgram(false);
            setProgramLessonLength(1);
            setProgramDuration(1);
            setProgramDurationUnit('Hours');
        });

        e.preventDefault();
    }
    const removeProgram = index => {
        let theCourses = [...courses];
        theCourses.splice(index, 1);
        setCourses(theCourses);
    }

    const submit = () => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('website', website);
        formData.append('country', JSON.stringify(country));
        formData.append('icon', icon);

        axios.post(`${config.baseUrl}/api/training-center/store`, formData)
        .then(response => {
            let res = response.data;
            courses.map((cour, c) => {
                let fd = new FormData();
                fd.append('title', cour.title);
                fd.append('description', cour.description);
                fd.append('is_online', cour.is_online);
                fd.append('is_certified', cour.is_certified);
                fd.append('duration', cour.duration);
                fd.append('lessons', cour.lessons);
                fd.append('cover', cour.cover);

                axios.post(`${config.baseUrl}/api/training-center/${res.tc.id}/course/store`, fd)
                .then(rp => {
                    setDone(true);
                })
            })
        })
    }

    return (
        <>
            <div className={styles.container}>
                {
                    isDone ?
                        <div className={styles.inner_container}>
                            <div className={styles.section}>
                                <div className={styles.SectionTitle}>Done</div>
                                <div className={styles.SectionDescription}>Done</div>
                            </div>
                        </div>
                    :
                    <div className={styles.inner_container}>
                        <div className={styles.section}>
                            <div className={styles.SectionTitle}>Training Center Registration</div>
                            <div className={styles.SectionDescription}>Please fill this form below in order to join Promociin training center</div>
                        </div>
                        <div className={styles.SectionTitle}>Basic Information</div>
                        <div className={styles.section} style={{padding: 40}}>
                            <div style={{display: 'flex',justifyContent: 'center',marginBottom: 40}}>
                                <InputFile label="Logo" aspectRatio="1/1" size={null} height={140} labelStyle={{fontSize: 14}} onChange={(input, e) => {
                                    setIcon(input.files[0]);
                                }} />
                            </div>
                            <Input label="Training Center Name" value={name} onInput={e => setName(e.currentTarget.value)} />
                            <Input label="Email" value={email} onInput={e => setEmail(e.currentTarget.value)} />
                            <Input label="Description" value={description} onInput={e => setDescription(e.currentTarget.value)} multiline />
                            <Input label="Phone Number" value={phone} onInput={e => setPhone(e.currentTarget.value)} />
                            <Input label="Website URL" value={website} onInput={e => setWebsite(e.currentTarget.value)} />
                            <div style={{fontSize: 13,color: '#777'}}>Country</div>
                            <Select options={countries} onChange={e => setCountry(JSON.parse(e.value))} />
                            <Input label="State" value={address} onInput={e => setAddress(e.currentTarget.value)} />
                        </div>

                        <div className={styles.SectionTitle}>Course Programs</div>
                        <div className={styles.section} style={{padding: 40}}>
                            {
                                courses.map((course, c) => (
                                    <div className={styles.ProgramItem}>
                                        <img src={course.cover_uri} alt="Program image" className={styles.ProgramImage} />
                                        <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column',gap: 5}}>
                                            <div>{course.title}</div>
                                            <div style={{display: 'flex',gap: 10,fontSize: 12,color: '#777',alignItems: 'center'}}>
                                                <div>{course.is_online ? 'Online' : 'Offline'}</div>
                                                <BiCircle color={config.primaryColor} size={10} />
                                                <div>{course.is_certified ? 'Certified' : 'No Certificate'}</div>
                                            </div>
                                        </div>
                                        <Button circle accent="secondary" color="red" height={30} onClick={() => removeProgram(c)}>
                                            <BiX />
                                        </Button>
                                    </div>
                                ))
                            }
                            <Button accent="secondary" onClick={() => setAddingProgram(true)}>
                                {
                                    courses.length === 0 ? 'Add your first program' : 'Add another course program'
                                }
                            </Button>
                        </div>

                        <div className="inline" style={{justifyContent: 'flex-end'}}>
                            <Button onClick={submit}>Submit</Button>
                        </div>
                    </div>
                }
            </div>

            {
                isAddingProgram &&
                <Popup onDismiss={() => setAddingProgram(false)} width="35%">
                    <TitleAdmin
                        title="Add Course Program"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAddingProgram(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form onSubmit={saveProgram}>
                        <InputFile label="Cover Image" aspectRatio="16/9" size={null} width={'100%'} labelStyle={{fontSize: 14}} onChange={(input, e) => {
                            setProgramImage(input.files[0]);
                        }} />
                        <Input label="Course Title" value={programTitle} onInput={e => setProgramTitle(e.currentTarget.value)} />
                        <Input label="Description" value={programDescription} onInput={e => setProgramDescription(e.currentTarget.value)} multiline />
                        <Input label="Lessons Length" value={programLessonLength} onInput={e => setProgramLessonLength(e.currentTarget.value)} type="number" />
                        <div className="inline">
                            <Input label="Duration" value={programDuration} onInput={e => setProgramDuration(e.currentTarget.value)} type="number" />
                            <select value={programDurationUnit} onChange={e => setProgramDurationUnit(e.currentTarget.value)}>
                                <option value="Hours">Hours</option>
                                <option value="Days">Days</option>
                                <option value="Weeks">Weeks</option>
                            </select>
                        </div>

                        <TitleAdmin
                            description="With completion certificate?"
                            style={{marginBottom: 5}}
                            right={
                                <Switch active={programCert} onChange={() => setProgramCert(!programCert)} />
                            }
                        />
                        <TitleAdmin
                            description="Online Classes?"
                            style={{marginBottom: 5}}
                            right={
                                <Switch active={programOnline} onChange={() => setProgramOnline(!programOnline)} />
                            }
                        />

                        <Button onClick={saveProgram}>Save Program</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default TCRegister