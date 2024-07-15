import React from "react";
import translation from "../../translation.json";
import useLang from "../../hooks/useLang";
import { BiBriefcase, BiCalendar } from "react-icons/bi";
import moment from "moment";

const RenderProfileInfo = ({profile}) => {
    const [lang, setLang] = useLang();

    return (
        <div className="mt-8 pe-8 mobile:pe-0">
            <div className="text-3xl font-black text-slate-700">{translation.profile.experience[lang]}</div>
            <div className="flex flex-wrap mobile:flex-col gap-4 mt-4">
                {
                    profile.experiences.map((exp, e) => (
                        <div key={e} className="p-4 border rounded-lg basis-4/12 mobile:w-full flex flex-col gap-2">
                            <div className="text-xl font-bold text-slate-700">{exp.position}</div>
                            <div className="text-sm text-slate-700 mb-4">{exp.description}</div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <BiBriefcase />
                                <div className="text-sm">{exp.company}</div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <BiCalendar />
                                <div className="text-sm text-slate-500">{moment(exp.start_date).format('DD MMM Y')} - {moment(exp.end_date).format('DD MMM Y')}</div>
                            </div>
                            {/* <div>{JSON.stringify(exp)}</div> */}
                        </div>
                    ))
                }
            </div>

            <div className="text-3xl font-black text-slate-700 mt-8">{translation.profile.education[lang]}</div>
            <div className="flex flex-wrap mobile:flex-col gap-4 mt-4">
                {
                    profile.educations.map((edu, e) => (
                        <div key={e} className="p-4 border rounded-lg basis-4/12 mobile:w-full flex flex-col gap-2">
                            <div className="text-xl font-bold text-slate-700">{edu.institute_name}</div>
                            <div className="text-sm text-slate-700 mb-4">{edu.major}</div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <BiCalendar />
                                <div className="text-sm text-slate-500">{moment(edu.start_date).format('DD MMM Y')} - {moment(edu.end_date).format('DD MMM Y')}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RenderProfileInfo