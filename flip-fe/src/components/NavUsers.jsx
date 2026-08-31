// navbar for users alr logged in
import full_logo from "../assets/full_logo.png"
import helio_icon from "../assets/helio.png"
import { Link } from "react-router-dom"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Study', href: '/flashcards', current: false },
  { name: 'Translate', href: '/translate', current: false },
  { name: "My Cards", href: "/viewCards", current: false}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  return (
    <Disclosure
      as="nav"
      className="relative bg-yellow-700 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 font-['Indie_Flower']"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a href="/" className="cursor-pointer">
                <img
                  alt="Helio"
                  src={full_logo}
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:ml-6">
            <button
              type="button"
              className="relative rounded-full text-slate-40 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 
                        h-14 bg-linear-65 from-green-700 to-yellow-400 p-4 font-[Indie_Flower] text-[18px] cursor-pointer"
            >
              Get Started
            </button>

            {/* Dashboard link */}
            <Link
              to="/dashboard"
              className="relative flex rounded-full ml-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
              title="Dashboard"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open dashboard</span>
              <img
                alt=""
                src={helio_icon}
                className="size-8 rounded-full bg-gray-800 object-cover outline -outline-offset-1 outline-white/10"
              />
            </Link>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
