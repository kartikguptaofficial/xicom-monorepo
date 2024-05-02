import { useState } from 'react'
import './App.css'
import { useMutation } from '@tanstack/react-query';
import { validateForm } from './utils/validation.util';
import { storeUserDetails } from './services/form.service';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [resStreet1, setResStreet1] = useState("");
  const [resStreet2, setResStreet2] = useState("");
  const [dob, setDob]: any = useState();

  const [isResidentialAddSame, setIsResidentialAddSame] = useState(false);
  const [inputFields, setInputFields] = useState([
    { name: '', type: '', file: '' }
  ])

  const removeFields = (index: any) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  const handleFormChange = (index: any, event: any, isFile = false) => {
    let data: any = [...inputFields];

    if (isFile) {
      const fileDetails = event.target.files[0];
      const uploadedFileType = fileDetails?.type;
      const selectedFileType = data[index]['type'];

      if (uploadedFileType?.includes(selectedFileType)) {
        data[index][event.target.name] = event.target.files[0];
        setInputFields(data);
      } else {
        window.alert("Invalid file type selected!")
        return;
      }
    } else {
      data[index][event.target.name] = event.target.value;
      setInputFields(data);
      return;
    }
  }

  const { mutate: formSubmitHandler } = useMutation({
    mutationKey: ["submitForm"],
    mutationFn: async () => {
      const formPayload = {
        email, firstName, lastName, street1, street2, resStreet1, resStreet2, inputFields, dob
      }
      const isFormValid = validateForm(formPayload)
      if (!isFormValid) return;

      const response = await storeUserDetails(formPayload);
      window.alert(response?.message);
      window.location.href = "/"
      return;
    }
  })

  return (
    <div className='mt-20'>
      <form className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" value={firstName} onChange={event => setFirstName(event.target.value)} name="firstName" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" value={lastName} onChange={event => setLastName(event.target.value)} name="lastName" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" value={email} onChange={event => setEmail(event.target.value)} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>


        <div className='w-full my-5'>
          <input type='date' onChange={(event) => {
            const dob = event.target.value
            setDob(dob);
          }} />
        </div>

        <label htmlFor="" className='text-xs'>Residential Address</label>

        <div className="grid md:grid-cols-2 md:gap-6 mt-5">
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" value={street1} onChange={event => setStreet1(event.target.value)} name="street1" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street 1</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" value={street2} onChange={event => setStreet2(event.target.value)} name="street2" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street 2</label>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input id="default-checkbox" type="checkbox" value="" checked={isResidentialAddSame} onChange={() => {
            setResStreet1("")
            setResStreet2("")
            if (isResidentialAddSame) {
              setIsResidentialAddSame(false);
            } else {
              setResStreet1(street1);
              setResStreet2(street2)
              setIsResidentialAddSame(true);
            }
            // setIsResidentialAddSame(!isResidentialAddSame)
          }} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Same as Residential address</label>
        </div>
        <label htmlFor="" className='text-xs'>Permanent Address</label>

        <div className="grid md:grid-cols-2 md:gap-6 mt-5">
          <div className="relative z-0 w-full mb-5 group">
            <input disabled={isResidentialAddSame} value={resStreet1} onChange={event => setResStreet1(event.target.value)} type="text" name="resStreet1" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street 1</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input disabled={isResidentialAddSame} value={resStreet2} onChange={event => setResStreet2(event.target.value)} type="text" name="resStreet2" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street 2</label>
          </div>
        </div>


        {inputFields.map((input, index) => {
          return <div className=" mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
            <div className='flex gap-1 justify-between align-middle items-center'>
              <div className="w-[30%] relative z-0 mb-5 group">
                <input type="text" value={input.name} onChange={event => handleFormChange(index, event)} name="name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">File Name</label>
              </div>
              <div className="w-[30%]">
                <select id="countries" name='type' value={input.type} onChange={event => handleFormChange(index, event)} className="bg-gray-50 h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected value="">-- File Type --</option>
                  <option value="image">Image</option>
                  <option value="pdf">Pdf</option>
                </select>
              </div>
              <div className="w-[30%]">
                <input type="file" onChange={event => handleFormChange(index, event, true)} name='file' accept=".pdf,image/*" />
              </div>
              <button onClick={() => removeFields(index)}>Remove</button>
              {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" /> */}
            </div>
          </div>
        })}
        <div className='my-5'>
          <button type="button" onClick={() => {
            let newfield = { name: '', type: '', file: '' }
            setInputFields([...inputFields, newfield])
          }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New File</button>
        </div>

        <button type="button" onClick={async () => await formSubmitHandler()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>

    </div>
  )
}

export default App
