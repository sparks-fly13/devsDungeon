import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import PlaceIcon from '@mui/icons-material/Place';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { motion } from 'framer-motion';




const sortOptions = [

]
const subCategories = [

]
const filters = [
  {
    id: 'Job Type',
    name: 'Job Type',
    options: [
      { value: 'Full Time', label: 'Full Time', checked: false },
      { value: 'Part Time', label: 'Part Time', checked: false },
      { value: 'Freelance', label: 'FreeLance', checked: false },
      { value: 'Temporary', label: 'Temporary', checked: false },
    ],
  },
  {
    id: 'Experience',
    name: 'Experience',
    options: [
      { value: 0, label: 'Fresher', checked: false },
      { value: 1, label: 'Less than 1 years', checked: false },
      { value: 2, label: '2 years', checked: false },
      { value: 3, label: '3 years', checked: false },
      { value: 4, label: 'More than 4 years', checked: false },
    ],
  },
  {
    id: 'Specialism',
    name: 'Specialism',
    options: [
      { value: 'Sales & Marketing', label: 'Sales & Marketing', checked: false },
      { value: 'Purchasing', label: 'Purchasing', checked: false },
      { value: 'Accountancy', label: 'Accountancy', checked: false },
      { value: 'Health & Care', label: 'Health & Care', checked: false },
      { value: 'Engineering', label: 'Engineering', checked: false },
    ],
  },
  {
    id: 'Expected Salary',
    name: 'Expected Salary',
    options: [
      { value: 10000, label: 'Less than 10000', checked: false },
      { value: 20000, label: '10,000 - 20,000', checked: false },
      { value: 30000, label: '20,000 - 30,000', checked: false },
      { value: 40000, label: '30,000 - 40,000', checked: false },
      { value: 50000, label: '40,000 - 50,000', checked: false },
      { value: 60000, label: '50,000 +', checked: false },
    ],
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function JobList() {


  const [jobData, setjobData] = useState([])

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [jobTypeSelected, setJobTypeSelected] = useState([])
  const [categorySelected, setCategorySelected] = useState([])
  const [experienceSelected, setExperienceSelected] = useState([])
  const [salarySelected, setSalarySelected] = useState([])

  //for pagination in display(start)
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 5;

  const lastItemIndex = PageSize * currentPage;
  const firstItemIndex = lastItemIndex - PageSize;

  const currentJobs = jobData.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //for pagination in display(end)

  //filter value check
  const filterValueGotClicked = (event) => {

    console.log("..........I M In the filter value checked section.........")

    const isChecked = event.target.checked;
    const value = event.target.value;
    const filterName = event.target.name;


    if (isChecked) {

      // console.log(`Filter ${filterName} is selected`);
      if (filterName === 'Job Type[]') {
        setJobTypeSelected(prevJobTypeSelected => [...prevJobTypeSelected, value]);
        console.log(jobTypeSelected);
      }
      else if (filterName === 'Experience[]') {
        setExperienceSelected(prevExperienceSelected => [...prevExperienceSelected, value]);
        console.log(experienceSelected);
      }
      else if (filterName === 'Specialism[]') {
        setCategorySelected(prevCategory => [...prevCategory, value])
        console.log(categorySelected)
      }
      else if (filterName === 'Expected Salary[]') {
        setSalarySelected(prevSalarySelected => [...prevSalarySelected, value]);
        console.log(salarySelected)
      }
    }
    else {
      if (filterName === 'Job Type[]') {
        const updated = jobTypeSelected.filter(item => item !== value);
        setJobTypeSelected(updated)
        console.log(jobTypeSelected)
      }
      else if (filterName === 'Experience[]') {
        const updated = experienceSelected.filter(item => item !== value);
        setExperienceSelected(updated)
        console.log(experienceSelected)
      }
      else if (filterName === 'Specialism[]') {
        const updated = categorySelected.filter(item => item !== value);
        setCategorySelected(updated)
        console.log(categorySelected)
      }
      else if (filterName === 'Expected Salary[]') {
        const updated = salarySelected.filter(item => item !== value);
        setSalarySelected(updated)
        console.log(salarySelected)
      }

    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get('/api/getdata')
        console.log(result)
        setjobData(result.data)

      } catch (error) {
        console.log("Error occured in the index.jsx frontend inside getData section = ", error)
      }
    }
    if (jobData.length === 0) {
      getData()
    }
  })

  useEffect(() => {

    const getFilteredData = async () => {
      const result = await axios.post('/api/getData/filters', { jobTypeSelected, categorySelected, experienceSelected, salarySelected })
      console.log("The result we got from backend in JobList section = ", result)
      setjobData(result.data)
    }

    getFilteredData()


  }, [jobTypeSelected, categorySelected, experienceSelected, salarySelected])


  const isMobile = window.innerWidth <= 768;

  return (
    <div className="bg-white dark:bg-[#151821]">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onClick={(e) => {
                                        filterValueGotClicked(e);
                                      }}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <motion.h1
            initial={{ y: '-50%', opacity: 0 }} // Start completely off screen left and invisible
            whileInView={{ x: 0, opacity: 1 }}     // Animate to its final position and fully visible
            transition={{ duration: 1 }}          // Specify the duration of the transition
            viewport={{ once: true }}               // Ensures the animation happens only once after coming into view
            
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-300">New Arrivals</motion.h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">


                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-[#101012] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="">{/**this section is no use but don't delete*/}
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>  {/**this section is no use*/}
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only m-10">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters for desktop */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 dark:text-red-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 dark:border-[#212734] py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white dark:bg-[#212734] py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900 dark:text-slate-200">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onClick={(e) => {
                                    console.log(option.value);
                                    filterValueGotClicked(e);
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 dark:text-gray-400"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div
              className="lg:col-span-3">
                {

                  currentJobs.map((job, i) => (

                    <motion.div
                    whileHover={{ scale: 1.03,duration:0.1 }} // Scale up the card on hover
              initial={{ y: '-50%', opacity: 0 }} // Start completely off screen left and invisible
              whileInView={{ y: 0, opacity: 1 }}     // Animate to its final position and fully visible
              transition={{ duration: 0.5+(i/2) }}          // Specify the duration of the transition
              viewport={{ once: true }}               // Ensures the animation happens only once after coming into view
              
              class="relative flex bg-clip-border m-[1.5vw] md:m-[5vw] rounded-xl border bg-white dark:bg-[#212734] text-gray-700 shadow-md w-full max-w-[90vw] flex-row hover:shadow-lg hover:border-green-500">
                      <div class="relative m-0 overflow-hidden text-gray-700 bg-white dark:text-gray-300 dark:bg-[#212734] rounded-none sm:rounded-md lg:rounded-xl bg-clip-border hidden sm:block w-full md:w-1/3 lg:w-1/3">
                        <img src={`https://source.unsplash.com/random/?company=${i}`} alt="card-image" class="object-cover w-auto h-[20vw]  md:h-[12vw] lg:h-[15vw] xl:h-[17vw]  sm:rounded-none lg:rounded-none xl:rounded-none" />
                      </div>

                      <div class="p-[1vw]">
                        <h4 class="block mb-[1vw] font-serif text-[3vw] md:text-[1.5vw] lg:text-[1.5vw] antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-green-500 uppercase">
                          {job.companyName}
                        </h4>
                        <h6 class="block mb-[1vw] font-serif text-[2vw] md:text-[1.2vw] antialiased leading-relaxed tracking-normal text-gray-700 dark:text-gray-300 ">
                          <div className='font-bold text-[2.5vw] md:text-[1.2vw]'>Role: {job.jobTitle}</div>
                        </h6>
                        <p class="flex flex-col md:flex-row items-start md:items-center gap-[1.5vw] mb-[1.5vw] md:mb-[3vw] font-serif text-base md:text-[1vw] antialiased font-normal leading-relaxed text-gray-700 dark:text-slate-400">
                          <div className='hidden md:flex items-center'>
                            <PlaceIcon />
                            <div className='font-bold text-[2vw] md:text-[1vw]'>Location: {job.location}</div>
                          </div>


                          <div className={`p-[0.2vw] text-white font-serif font-medium rounded ${isMobile ? 'text-[3vw]' : 'text-[1vw]'} ${job.jobType === 'Full Time' ? 'bg-green-400' :
                              job.jobType === 'Part Time' ? 'bg-yellow-400' :
                                job.jobType === 'Temporary' ? 'bg-blue-400' :
                                  job.jobType === 'Freelance' ? 'bg-red-400' : ''
                            }`}>
                            {job.jobType}
                          </div>
                        </p>
                        <NavLink to={`/JobDetail/${job._id}`} className="inline-block">
                          <button className={`flex items-center gap-[1vw] px-[1vw] md:px-[1.2vw] font-serif ${isMobile ? 'text-[3vw]' : 'text-[1vw]'} font-semibold text-center text-gray-900 dark:text-gray-400 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20" type="button`}>
                            Learn More
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                            </svg>
                          </button>
                        </NavLink>
                      </div>
                    </motion.div>

                  ))
                }

                <div className="flex justify-center">
                  {/* Previous Button */}
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mx-2 px-3 py-1 rounded bg-gray-200 text-gray-700"
                  >
                    Previous
                  </button>

                  {/* Page Buttons */}
                  {Array.from({ length: Math.ceil(jobData.length / PageSize) }).map((_, index) => {
                    const pageNumber = index + 1;
                    const isWithinRange = Math.abs(pageNumber - currentPage) < 2;
                    if (pageNumber === 1 || pageNumber === Math.ceil(jobData.length / PageSize) || isWithinRange) {
                      return (
                        <button
                          key={index}
                          onClick={() => paginate(pageNumber)}
                          className={`mx-2 px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null;
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(jobData.length / PageSize)}
                    className="mx-2 px-3 py-1 rounded bg-gray-200 text-gray-700"
                  >
                    Next
                  </button>

                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
