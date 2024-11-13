import Link from 'next/link'

const Nav = props => {
    return(
        <>
        <Link href="/"><b>Home</b></Link>
        <Link href="/next"><b>Next</b></Link>
        </>
    )
}

export default Nav