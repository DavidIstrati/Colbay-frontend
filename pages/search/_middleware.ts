import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
    if(req.nextUrl.searchParams.get('q') || req.nextUrl.searchParams.get('category')) {
        return NextResponse.rewrite(req.nextUrl)
    }else{
        return NextResponse.rewrite(`${req.nextUrl.origin}/search/home/`)
    }
}