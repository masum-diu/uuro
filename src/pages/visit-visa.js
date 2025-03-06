import Layout from '@/components/Layout'
import React, { useState } from 'react'

function visitvisa() {
    const [hover, setHover] = useState();
    return (
        <div><Layout setHover={setHover} /> visit-visa</div>
    )
}

export default visitvisa