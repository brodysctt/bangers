const Loader = ({ loading }: { loading: boolean }) => {
  return loading ? <div className="loader"></div> : null
}

export default Loader
